import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import { challengeRouter } from "./routers/challengeRouter";
import { userChallengeRouter } from "./routers/userChallengeRouter";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("data project root api");
});

app.use("/challenges", challengeRouter);
app.use("/userChallenge", userChallengeRouter);
app.use("/certification", certificationRouter);

app.use(errorMiddleware);

export { app };
