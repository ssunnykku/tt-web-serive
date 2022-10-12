import { stringify } from "uuid";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// user 코드 완성되면 user 스키마 파일 위치나 export 된 변수명 확인하고 수정하기

//uesr model에 접근
class Login {
  static async createUser({ userId, newUser }) {
    const registerUser = await prisma.user.create({
      data: {
        userId: userId,
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
        withdrawal: 0,
        joinedChallengeId: null,
        holdChallengeId: null,
        img: null,
      },
    });
    return registerUser;
  }

  static async findByEmail({ email }) {
    const finduser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return finduser;
  }

  static async findByUserId({ userId }) {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    return user;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { userId: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateData = await prisma; //.findOneAndUpdate(filter, update, option);
    return updateData;
  }

  // token model에 접근
  // 찾기// -> where로 필터링 가능하면 이 로직 필요 없음
  // static async findToken({ userId }) {
  //   const token = await prisma.refreshToken.findUnique({
  //     where: {
  //       userId: userId,
  //     },
  //   });
  //   return token;
  // }
  //생성
  static async createToken({ userId }) {
    const token = await prisma.refreshToken.create({
      data: {
        refreshToken: userId,
        userId: userId,
      },
    });
  }
  // 토큰업데이트
  static async tokenUpdate({ userId, refreshToken }) {
    const token = await prisma.refreshToken.update({
      where: {
        userId: userId,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
    console.log(token);
    return token;
  }

  // //liked에 접근
  // static async createLiked({ userId, likedId }) {
  //   await prisma.liked.create({
  //     data: {
  //       likedId: likedId,
  //       userId: userId,
  //       challengeId: null,
  //     },
  //   });
  // }
  // //point에 접근
  static async createPoint({ userId }) {
    console.log(userId);
    await prisma.point.create({
      data: {
        userId: userId,
        point: 100,
      },
    });
  }
}

export { Login };
