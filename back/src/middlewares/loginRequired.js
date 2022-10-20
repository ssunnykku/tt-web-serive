import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function loginRequired(req, res, next) {
  //프론트에서 엑세스 토큰만 보낼때
  const accessToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  if (accessToken) {
    try {
      const secretKey = process.env.JWT_SECRET_KEY;
      const jwtDecoded = jwt.verify(accessToken, secretKey);
      const userId = jwtDecoded.userId;
      req.currentUserId = userId;

      next();
    } catch (error) {
      // res.status(400).send("access token이 유효하지 않습니다.");

      const refreshToken = req.body.refreshToken;
      // const refreshToken = userToken["authorization"]?.split(" ")[1] ?? "null";

      if (refreshToken) {
        try {
          const secretKey = process.env.JWT_SECRET_KEY;
          // 1.  리프레시 토큰 검증
          const jwtDecoded = jwt.verify(refreshToken, secretKey);
          const userId = jwtDecoded.userId;

          const token = async () => {
            console.log("refresh db 접근할때 사용할 userId:", userId);
            console.log("여기로 왜 콜백 실행 안됨?:");
            const token = await prisma.refreshToken.findUnique({
              where: {
                userId: userId,
              },
            });
            const refreshFromDb = token.refreshToken;
            //두번째 - front에서 준 refresh token과 db의 refresh token 과 동일한지 비교

            if (refreshFromDb !== refreshToken) {
              console.log("디비와 토큰이 다른 에러:");
              const errorMessage = "refresh token이 유효하지 않습니다.";
              res.status(400).return("디비와 토큰이 다른 에러:");
            }
            console.log("⭐️db에서 가져온 refresh=", refreshFromDb);
            console.log("🦄req.body-decoded refresh=", refreshFromDb);
            // res
            //   .status(200)
            //   .send("refresh token검증완료. access token을 발급해주세요");
            // // return token.refreshToken;
          };
          console.log("안녕");
          const refreshFromDb = token();
          console.log(refreshFromDb);
          //이부분은 삭제예정
          /*
        // // refresh token 유효하면 access token생성 후, currentUserId와 함께 req로 보냄(req 두번보내도 되는건가..?)
        // req.accessToken = jwt.sign({ userId }, secretKey, {
        //   expiresIn: "1h",
        // });
        // req.currentUserId = userId;
        // next();
        */
        } catch (error) {
          res.status(400).send("어디로 가는걸까");
          return;
        }
      } else {
        // 만약 refresh token이 없다면 로그인창으로 이동시키기-> 프론트?
        res
          .status(400)
          .send("Refresh token does not exist, 로그인후 이용해주세요");
      }
      res.status(400).send("access token이 유효하지 않습니다.");
      return;
    }
  }
}

export { loginRequired };
