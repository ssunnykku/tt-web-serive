import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class challenge {
  // create/ post(유저별로 수정할 것)
  static async create({ newChallenge }) {
    const createdChallenge = await prisma.challenge.create({
      data: newChallenge,
    });
    return createdChallenge;
  }

  // 전체 불러오기 (get)
  static async findMany() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }
  // 진행중인 챌린지만 불러오기 (시작예정인 챌린지 제외되어있음)
  static async findOngoing() {
    const challenges = await prisma.challenge.findMany({
      where: {
        AND: [
          {
            startRemainingDate: {
              gte: Number(0),
            },
          },
          {
            endRemainingDate: {
              gte: Number(0),
            },
          },
        ],
      },
    });
    return challenges;
  }
  // (params 값) 게시물 1개 선택
  static async findUnique(id) {
    const challenge = await prisma.challenge.findUnique({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
  static async findMany() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }

  // (params 값) 게시물 1개 선택
  static async findUnique(id) {
    const challenge = await prisma.challenge.findUnique({
      where: {
        challengeId: 2,
      },
    });
    return challenge;
  }
  // Delete
  static async delete(id) {
    const challenge = await prisma.challenge.delete({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
  // 해당 유저아이디를 가진 챌린지 하나 가져오기
  // static async findUniqueUser(userId, id) {
  //   const challenge = await prisma.userToChallenge.findUnique({
  //     where: {
  //       And: [{ userId: userId }, { challengeId: id }],
  //     },
  //   });
  //   return challenge;
  // }

  static async findUniqueChallenge(id) {
    const challenge = await prisma.challenge.findUniqueChallenge({
      where: {
        challengeId: 2,
      },
    });
    return challenge;
  }

  // Update
  static async update({
    id,
    title,
    description,
    fromDate,
    toDate,
    titleImg,
    explainImgs,
  }) {
    const renewChallenge = await prisma.challenge.update({
      where: {
        challengeId: Number(id),
      },
      data: {
        title: title,
        description: description,
        fromDate: fromDate,
        toDate: toDate,
        mainImg: titleImg,
        explainImg: explainImgs,
        startRemainingDate: dayCountsBetweenTodayAnd(fromDate),
        endRemainingDate: dayCountsBetweenTodayAnd(toDate) * -1,
      },
    });

    return renewChallenge;
  }
}
export { challenge };
