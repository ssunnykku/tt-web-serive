import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import { challengeRouter } from "./routers/challenges";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("data project root api");
});

app.use("/challenges", challengeRouter);
// app.get("/challenges", (req, res) => {
//   res.send(`<h2>challenges 생성 페이지</h2>`);
// });

app.use(errorMiddleware);

export { app };
