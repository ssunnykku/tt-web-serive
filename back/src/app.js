import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { pointRouter } from "./routers/pointRouter";
import { userRouter } from "./routers/userRouter";
import { likedRouter } from "./routers/likedRouter";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(req, body);
  res.send("data project root api");
});
app.use(userRouter);
app.use(pointRouter);
app.use(likedRouter);
app.use(errorMiddleware);

export { app };
