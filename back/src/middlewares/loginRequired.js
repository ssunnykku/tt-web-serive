import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function loginRequired(req, res, next) {
  //프론트에서 엑세스 토큰만 보낼때
  const accessToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  if (accessToken) {
    // 해당 access token이 정상적인 토큰인지 확인 후 userId 추출
    //여기까지는 해커 탈취한 토큰으로 req보내면 정상인증이 된다
    try {
      console.log("🐰", accessToken);
      // console.log("🐰", process.env.JWT_SECRET_KEY);
      // console.log("jwt:", jwt.verify);
      const secretKey = process.env.JWT_SECRET_KEY;
      const jwtDecoded = jwt.verify(accessToken, secretKey);
      console.log("decoded", jwtDecoded);
      console.log("🙏", jwtDecoded.userId);
      const userId = jwtDecoded.userId;
      console.log("추출한 userId", userId);
      // token에서 추출한 유저의 id를 currentUserId에 할당해서 req보냄
      req.currentUserId = userId;
      //next하면 이 미들웨어 벗어남
      next();
    } catch (error) {
      console.log();
      res.status(400).send("access token이 유효하지 않습니다.");
      return;
    }
  }

  //프론트에서 리프레시토큰만 보낼때 (이거 맞는지 프론트랑 이야기해봐야할듯)
  const refreshToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  //  access 400떠서 리프레시토큰 다시 보내주면 그거 검증 로직.
  // refresh token 존재하면 access token 발급할여 프론트에 전송
  if (refreshToken) {
    try {
      const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
      const jwtDecoded = jwt.verify(refreshToken, secretKey);
      const userId = jwtDecoded.userId;
      // db에서 token가져오는거 비동기 처리 해야하는데...

      const token = async () => {
        const token = await Login.findToken({ userId });
        return token;
      };
      const refreshFromDb = token.refreshToken;
      //front에서 준 refresh token과 db의 refresh token 과 동일한지 비교
      if (refreshFromDb !== refreshToken) {
        const errorMessage = "refresh token이 유효하지 않습니다.";
        return errorMessage;
      }

      // refresh token 유효하면 access token생성 후, currentUserId와 함께 req로 보냄(req 두번보내도 되는건가..?)
      req.accessToken = jwt.sign({ userId }, secretKey, {
        expiresIn: "1h",
      });
      req.currentUserId = userId;
      next();
    } catch (error) {
      res.status(400).send("refresh token이 만료되었습니다.");
      return;
    }
  } else {
    // 만약 refresh token이 없다면 로그인창으로 이동시키기-> 프론트?
    res.status(400).send("Refresh token does not exist, 로그인후 이용해주세요");
  }
}

export { loginRequired };
