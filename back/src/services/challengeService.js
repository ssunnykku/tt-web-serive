const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// class challengeService {
//   static async addChallenge({
//     challengeId,
//     // userId,
//     // pointId,
//     title,
//     description,
//     fromDate,
//     toDate,
//     // img,
//     // createdAt,
//     // updatedAt,
//   }) {
//     const newChallenge = {
//       challengeId,
//       title,
//       description,
//       from,
//       to,
//     };
//     const createdChallenge = await prisma.challenge.create({ newChallenge });
//     return createdChallenge;
//   }
// }

// export { challengeService };
