import { challenge } from "../models/challenge";
import { dayCountsBetweenTodayAnd } from "../middlewares/dayCountsBetweenTodayAnd";

class challengeService {
  // create/ post
  static async addChallenge({
    holdUserId,
    title,
    description,
    fromDate,
    toDate,
    mainImg,
    explainImg,
  }) {
    const newChallenge = {
      holdUserId,
      title,
      description,
      fromDate,
      toDate,
      startRemainingDate: dayCountsBetweenTodayAnd(fromDate),
      endRemainingDate: dayCountsBetweenTodayAnd(toDate) * -1,
      mainImg,
      explainImg,
    };
    const createdChallenge = await challenge.create({
      newChallenge,
    });
    return createdChallenge;
  }

  // 전체 불러오기 (get)
  static async getChallenges() {
    const challenges = await challenge.findMany();
    return challenges;
  }

  // Get (진행중인 챌린지 전체)
  static async getOngoing() {
    const challenges = await challenge.findOngoing();

    return challenges;
  }
  // id 값을 게시물 1개 선택하기(params 값을 이용)
  static async findUniqueId(id) {
    const findId = await challenge.findUnique(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }
  // id 값을 게시물 1개 선택하기(params 값을 이용)
  static async findUniqueId(id) {
    const findId = await challenge.findUnique(id);
    if (!findId) {
      const error = new Error("invalid id");
      throw error;
    }
    return findId;
  }

  // Delete
  static async deleteOne(id) {
    // const findId = await challenge.findFromDate(id);
    // if (dayCountsBetweenTodayAnd(fromDate) >= 0) {
    //   const error = new Error("cannot modify it after the challenge begins.");
    //   throw error;
    // }
    const deleteChallenge = await challenge.delete(id);

    return deleteChallenge;
  }

  static async addImage(id, addedImage) {
    const createdChallenge = await challenge.create({
      id,
      addedImage,
    });
    return createdChallenge;
  }

  // static async findUniqueUser(userId, id) {
  //   const findUserId = await challenge.findUniqueUser(userId, id);
  //   return findUserId;
  // }

  //예상 포인트 조회
  static async expectPoint({challengeId}){
    
    const currentChallenge=await challenge.findUnique(challengeId);
    const currentFromDate=new Date(currentChallenge.fromDate);
    const currentToDate=new Date(currentChallenge.toDate);
    const diff = currentToDate - currentFromDate;
    const currDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
    const diffInt=parseInt(diff/currDay);
    const expectPoint=diffInt*10;
    return expectPoint;
  }
}

export { challengeService };
