import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";
dotenv.config();

class userService {
  // 1. 회원가입 서비스
  static async addUser({ email, password, confirmPassword, name }) {
    //이메일이 같은 유저 목록

    const user = await User.findByEmail({ email });
    //0회원 1탈퇴

    if (user.length) {
      if (user) {
        //이메일 같은 유저 중
        if (user[0].withdrawal == 0) {
          //false
          const errorMessage = "이미 사용중인 email입니다.";
          return errorMessage;
        }
      }
    }
    if (password !== confirmPassword) {
      const errorMessage = "비밀번호가 일치하지 않습니다";
      return errorMessage;
    }

    // //비밀번호 해쉬화
    const hashpassword = await bcrypt.hash(password, 10);
    // //user객체에 유니크한 id 부여
    const userId = uuidv4();
    // const likedId = uuidv4();

    const newUser = { userId, email, password: hashpassword, name };
    const createNewUser = await User.createUser({ userId, newUser });
    createNewUser.errorMessage = null;

    //  // 토큰 스키마에 유저id추가
    await User.createToken({ userId });
    await User.createPoint({ userId });
    return createNewUser;
  }

  //1-1 카카오 회원가입
  static async addUserByKakaoId({ kakaoId }) {
    const user = await User.findByKakaoId({ kakaoId });
    if (user) {
      const errorMessage = "이미 연동된 이메일 입니다. 다시 로그인 해주세요";
      return errorMessage;
    }
    //카카오 유저용 임시 email ??
    let tempUser = true;
    let randomString = null;
    let email = null;
    do {
      randomString = Math.random().toString(10).slice(2, 10);
      email = `kakaouser${randomString}@test.com`;

      tempUser = await User.findByEmail({ email });
    } while (tempUser);

    // 카카오용 임시 비밀번호
    const password = Math.random().toString(36).slice(2, 11);
    const hashpassword = await bcrypt.hash(password, 10);
    //카카오용 임시 닉네임
    const name = `하프물범${randomString}`;
    const newUser = { email, password: hashpassword, name, userId: kakaoId };
    const createNewUser = await User.createPoint({ newUser });
    createNewUser.errorMessage = null;
    //db에 저장

    try {
      delete createNewUser._doc["password"];
      delete createNewUser._doc["kakaoId"];
    } finally {
      return createNewUser;
    }
  }

  //1-2 카카오 로그인
  static async getKakaoUser({ kakaoId }) {
    const user = await User.findByKakaoId({ kakaoId });
    if (!user) {
      const errorMessage = "연동된 카카오 계정이 없습니다.";
      return errorMessage;
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user._id }, secretKey);

    const loginUser = {
      ...user,
      token,
      errorMessage: null,
    };

    try {
      delete loginUser["password"];
    } finally {
      return loginUser;
    }
  }

  //1-3 kakaoId  로 유저 조회
  static async getUserByKakaoId({ kakaoId }) {
    const user = await User.findByKakaoId({ kakaoId });
    if (!user) {
      const errorMessage = "해당 이메일은 가입 내역이 없습니다.";
      return errorMessage;
    }

    return user;
  }

  // 2. 로그인 서비스
  static async userLogin({ email, password }) {
    const data = await User.findByEmail({ email }); //이메일이 같은 유저 리스트
    const user = data[0];
    //0회원 1탈퇴

    if (data.length) {
      if (data) {
        if (user.withdrawal == 1) {
          //true
          const errorMessage = "존재하지 않는 계정입니다.";
          return errorMessage;
        }
      }
    }

    const haspassword = user.password;
    const isCorrect = await bcrypt.compare(password, haspassword);
    if (!isCorrect) {
      const errorMessage = "비밀번호가 일치하지 않습니다.";
      return errorMessage;
    }

    // //로그인 정보 검사 후 refresh, access token 발급을 위한 코드>> 프론트에 넘겨줘야한다
    const secretKey = process.env.JWT_SECRET_KEY;
    const accessToken = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "14d",
    });
    const userId = user.userId;
    await User.tokenUpdate({ userId, refreshToken });

    //이거 적용 해야함
    // const hashrefreshToken = await bcrypt.hash(password, 10);

    const name = user.name;
    const loginUser = {
      userId,
      email,
      name,
      accessToken,
      refreshToken,
      //image 정보도 res해줘야할거같음 추가하기!!
      errorMessage: null,
    };
    return loginUser;
  }

  // 3. 유저 한명 정보 가져오기
  static async findCurrentUser({ userId }) {
    const userData = await User.findByUserId({ userId });

    return userData;
  }

  //4. 유저 password 수정
  static async updatePW({ userId, password }) {
    const user = await User.findByUserId({ userId });
    if (!user) {
      const errorMessage =
        "비밀번호 변경 권한이 없습니다. 로그인 후 이용해주세요";
      return errorMessage;
    }
    if (password) {
      password = await bcrypt.hash(password, 10);
      const updatePW = await User.updatePW({ userId, password });
      return updatePW;
    }
  }

  //5. 유저정보 수정
  static async updateUser(userId, name, email) {
    const user = await User.findByUserId({ userId });

    if (!user) {
      const errorMessage =
        "user정보 수정 권한이 없습니다. 로그인 후 이용해주세요";
      return errorMessage;
    }
    const updateUser = await User.updateUser(userId, name, email);
    return updateUser;
  }

  // user img get
  static async getCurrentImg({ userId }) {
    const newImg = await User.getUserImg({ userId });

    if (!newImg) {
      const errorMessage = "no iamge";
      return errorMessage;
    }
    ("");
    return newImg;
  }

  // user img update
  static async updateUserImg({ img, userId }) {
    const user = await User.findByUserId({ userId });

    if (!user) {
      const errorMessage =
        "프로필사진 수정 권한이 없습니다. 로그인 후 이용해주세요";
      return { errorMessage };
    }
    console.log("서비스");
    const updateimg = await User.EditImg({ userId, img });
    return updateimg;
  }

  // user img delete
  static async removeUserImg({ userId }) {
    const user = await User.findByUserId({ userId });

    if (!user) {
      const errorMessage =
        "프로필사진 수정 권한이 없습니다. 로그인 후 이용해주세요";
      return { errorMessage };
    }
    const updateimg = await User.deleteUserImg({ userId });
    return updateimg;
  }

  //6. 회원탈퇴
  static async userWithdrawal({ userId, id, withdrawal }) {
    if (userId !== id) {
      const errorMessage = "UserId가 틀립니다.";
      return errorMessage;
    }

    if (withdrawal == 1) {
      let user = await User.findByUserId({ userId });
      const newValue = withdrawal;
      user = await User.updateWithdrawal({ userId, newValue });
    }
  }
}
export { userService };
