
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function loginRequired(req, res, next) {
  const accessToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  if (accessToken) {
    try {
      const secretKey = process.env.JWT_SECRET_KEY;
      const jwtDecoded = jwt.verify(accessToken, secretKey);
      const userId = jwtDecoded.userId;
      req.currentUserId = userId;

      next();
    } catch (error) {
      const refreshToken = req.body.refreshToken;

      if (refreshToken) {
        try {
          const secretKey = process.env.JWT_SECRET_KEY;
          const jwtDecoded = jwt.verify(refreshToken, secretKey);
          const userId = jwtDecoded.userId;

          const token = async () => {
            const token = await prisma.refreshToken.findUnique({
              where: {
                userId: userId,
              },
            });
            const refreshFromDb = token.refreshToken;

            if (refreshFromDb != refreshToken) {
<<<<<<< HEAD
              const errorMessage = "refresh token이 유효하지 않습니다.";
              res.status(400).send("디비와 토큰이 다른 에러:");
            }
            // res
            //   .status(200)
            //   .send("refresh token검증완료. access token을 발급해주세요");
            // // return token.refreshToken;
             // refresh token 유효하면 access token생성 후, currentUserId와 함께 req로 보냄(req 두번보내도 되는건가..?)
             const accessToken = jwt.sign({ userId }, secretKey, {
=======
              res.status(400).return("디비와 토큰이 다른 에러:");
            }
          };
          const refreshFromDb = token();

          const accessToken = jwt.sign({ userId }, secretKey, {
>>>>>>> 136ac2edab4dab7f345059257269d50c9025780b
            expiresIn: "1h",
          });
          req.currentUserId = userId;
          res.status(201).send(accessToken);
          };
          const refreshFromDb = token();

         
        } catch (error) {
          res
            .status(400)
            .send("Refresh token does not exist, 로그인후 이용해주세요");
          return;
        }
      } else {
        res.status(400).send("access token이 유효하지 않습니다.");
      }
      return;
    }
  }
}

export { loginRequired };

