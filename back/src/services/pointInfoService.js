import { PointInfo } from "../models/PointInfo";

class pointInfoService {
  //user별 참가한 챌린지 포인트조회
  static async getPointInfo({ userId }) {
    const ChallengePointInfoList = await PointInfo.findPointInfo({ userId });
    return ChallengePointInfoList;
  }
}

export { pointInfoService };
