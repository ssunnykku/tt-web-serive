import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function loginRequired(req, res, next) {
  //프론트에서 엑세스 토큰만 보낼때
  const accessToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  if (accessToken) {
    // 해당 access token이 정상적인 토큰인지 확인 후 userId 추출
    //여기까지는 해커 탈취한 토큰으로 req보내면 정상인증이 된다
    try {
      const secretKey = process.env.JWT_SECRET_KEY;
      const jwtDecoded = jwt.verify(accessToken, secretKey);

      const userId = jwtDecoded.userId;

      // token에서 추출한 유저의 id를 currentUserId에 할당해서 req보냄
      req.currentUserId = userId;

      // console.log("📌", req.headers["authorization"]?.split(" ")[1]);
      // console.log("📌", userId);
      //next하면 이 미들웨어 벗어남
      next();
    } catch (error) {
      console.log();
      res.status(400).send("access token이 유효하지 않습니다.");
      return;
    }
  }

  //프론트에서 리프레시토큰만 보낼때 (이거 맞는지 프론트랑 이야기해봐야할듯)
  //   // const refreshToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  //   const userToken = req.body.refreshToken;
  //   // const refreshToken = userToken["authorization"]?.split(" ")[1] ?? "null";
  //   console.log("body:", req.body);
  //   console.log("userToken:", userToken);
  //   console.log("refreshToken:", refreshToken);

  //   if (refreshToken) {
  //     try {
  //       const secretKey = process.env.JWT_SECRET_KEY;
  //       // 첫번째 - 리프레시 토큰 검증
  //       const jwtDecoded = jwt.verify(refreshToken, secretKey);
  //       const userId = jwtDecoded.userId;

  //       const token = async () => {
  //         console.log("db 접근할때 사용할 userId:", userId);
  //         const token = await prisma.refreshToken.findUnique({
  //           where: {
  //             userId: userId,
  //           },
  //         });
  //         return token;
  //       };
  //       const refreshFromDb = token.refreshToken;
  //       //두번째 - front에서 준 refresh token과 db의 refresh token 과 동일한지 비교
  //       if (refreshFromDb !== refreshToken) {
  //         const errorMessage = "refresh token이 유효하지 않습니다.";
  //         return errorMessage;
  //       }
  //       // res
  //       //   .status(200)
  //       //   .send("refresh token검증완료. access token을 발급해주세요");

  //       //이부분은 삭제예정
  //       /*
  //       // // refresh token 유효하면 access token생성 후, currentUserId와 함께 req로 보냄(req 두번보내도 되는건가..?)
  //       // req.accessToken = jwt.sign({ userId }, secretKey, {
  //       //   expiresIn: "1h",
  //       // });
  //       // req.currentUserId = userId;
  //       // next();
  //       */
  //     } catch (error) {
  //       res.status(400).send("refresh token이 만료되었습니다.");
  //       return;
  //     }
  //   } else {
  //     // 만약 refresh token이 없다면 로그인창으로 이동시키기-> 프론트?
  //     res.status(400).send("Refresh token does not exist, 로그인후 이용해주세요");
  //   }
}

export { loginRequired };
