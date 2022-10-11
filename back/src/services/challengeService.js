import { challengeModel } from "../models/challengeModel";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class challengeService {
  static async addChallenge({ title, description, fromDate, toDate, img }) {
    const newChallenge = { title, description, fromDate, toDate, img };
    const createdChallenge = await challengeModel.create({ newChallenge });
    return createdChallenge;
  }
  //   static async getChallenges({

  //   })
}

export { challengeService };
