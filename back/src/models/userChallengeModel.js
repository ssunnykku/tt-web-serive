const { PrismaClient } = require("@prisma/client");
import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

const prisma = new PrismaClient();

class userChallengeModel {
  // create
  // static async create({ newChallenge }) {
  //   const createdChallenge = await prisma.challenge.create({
  //     data: newChallenge,
  //   });
  //   return createdChallenge;
  // }

  static async findMany() {
    const challenges = await prisma.challenge.findMany();
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
  // Delete
  static async delete(id) {
    const challenge = await prisma.challenge.delete({
      where: {
        challengeId: Number(id),
      },
    });
    return challenge;
  }
  // Update
  // static async update(
  //   id,
  //   title,
  //   description,
  //   fromDate,
  //   toDate,
  //   mainImgPath,
  //   explainImgs
  // ) {
  //   const challenge = await prisma.challenge.update({
  //     where: {
  //       challengeId: Number(id),
  //     },
  //     data: {
  //       title,
  //       description,
  //       fromDate,
  //       toDate,
  //       mainImg: mainImgPath,
  //       explainImg: explainImgs,
  //       startRemainingDate: dayCountsBetweenTodayAnd(fromDate),
  //       endRemainingDate: dayCountsBetweenTodayAnd(toDate) * -1,
  //     },
  //   });
  //   return challenge;
  // }
}
export { userChallengeModel };
