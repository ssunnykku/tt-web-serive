//db에 접근하는 코드 import 해야 함
import { Login } from "../models/Login";
import bcrypt from "bcrypt";
// use `prisma` in your application to read and write data in your DBimport bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class loginService {
  // 1. 회원가입 서비스
  static async addUser({ email, password, confirmPassword, name }) {
    console.log("db접근 전");

    const user = await Login.findByEmail({ email });
    if (user) {
      const errorMessage = "이미 사용중인 email입니다.";
      return errorMessage;
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
    const createNewUser = await Login.createUser({ userId, newUser });
    createNewUser.errorMessage = null;
    //  // 토큰 스키마에 유저id추가
    await Login.createToken({ userId });
    // await Login.createLiked({ userId, likedId });
    await Login.createPoint({ userId });
    return createNewUser;
  }

  // 2. 로그인 서비스
  static async userLogin({ email, password }) {
    console.log("서비스 2");

    const user = await Login.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다.다시 한 번 확인해 주세요.";
      return errorMessage;
    }
    console.log("서비스 3");
    const hashpassword = user.password;
    const isCorrect = await bcrypt.compare(password, hashpassword);
    if (!isCorrect) {
      const errorMessage = "비밀번호가 일치하지 않습니다.";
      return errorMessage;
    }
    console.log("서비스 4");

    // //로그인 정보 검사 후 refresh, access token 발급을 위한 코드>> 프론트에 넘겨줘야한다
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const accessToken = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "14d",
    });
    // 리프레시 토큰 db update
    console.log("서비스 5");

    const userId = user.userId;

    if (refreshToken) {
      await Login.tokenUpdate({ userId, refreshToken });
    }
    //디비에서 유효기간 지난 토큰은  자동으로 verify에서 걸러진다.

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
    const userData = await Login.findByUserId({ userId });
    return userData;
  }

  //4. 유저 password 수정
  static async updatePW({ userId, password }) {
    const user = await Login.findByUserId({ userId });

    if (!user) {
      const errorMessage =
        "비밀번호 변경 권한이 없습니다. 로그인 후 이용해주세요";
      return errorMessage;
    }

    if (password) {
      const fieldToUpdate = "password";
      const newValue = bcrypt.hash(password, 10);
      updateData = await Login.update({ userId, fieldToUpdate, newValue });
    }

    return updateData;
  }

  //4. 유저정보 수정
  static async updateUser({ userId, name, image }) {
    const user = await Login.findByUserId({ userId });

    if (!user) {
      const errorMessage =
        "user정보 수정 권한이 없습니다. 로그인 후 이용해주세요";
      return errorMessage;
    }
    if (name) {
      const fieldToUpdate = "name";
      const newValue = name;
      updateData = await Login.update({ userId, fieldToUpdate, newValue });
    }
    if (image) {
      const fieldToUpdate = "image";
      const newValue = image;
      updateData = await Login.update({ userId, fieldToUpdate, newValue });
    }

    return updateData;
  }
}

export { loginService };
