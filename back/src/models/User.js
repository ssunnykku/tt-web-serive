const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { stringify } from "uuid";

class User {
  
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
          description:"자기소개를 입력해주세요."
          //img: null,
        },
      });
      return registerUser;
    }

    //같은 이메일 찾기
    static async findByEmail({ email }) {
      console.log(email,"모델");
      const finduser = await prisma.user.findMany({
        where: {
          email: email,
        },
        orderBy: {
            withdrawal: 'asc',
          },
      });
      return finduser;
    }


    //유저 찾기
    static async findByUserId({ userId }) {

      const users = await prisma.user.findUnique({
        where:{
          userId: userId,
        }
     });
      return users;
    }

    //4. 유저 비번 수정
    static async updatePW({ userId, password }) {
      const updatePW = await prisma.user.update({
        where: {
          userId: (userId),
        },
        data: {
          password:password,
        },
      });
      return updatePW;
    }  

    //유저 정보 수정
    static async updateUser(userId,name, description) {
      const updateuser = await prisma.user.update({
        where: {
          userId: userId,
        },
        data: { name, description},
      });
      return updateuser;
    }
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
      //console.log(token);
      return token;
    }
    static async createPoint({ userId }) {
      //console.log(userId);
      await prisma.point.create({
        data: {
          userId: userId,
          point: 100,
        },
      });
    }
  
  
    //회원탈퇴
    static async updateWithdrawal({ userId, newValue }) {
      
      const updateWithdrawal = await prisma.user.update({
        where: {
          userId : (userId)
        },
        data: {
            withdrawal: newValue,
  
        }
      });
      return updateWithdrawal;
    }

}
export { User };
