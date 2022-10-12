import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { loginRouter } from "./routers/loginRouter";
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // console.log(req,body);
  res.send("data project root api");
});
app.use(loginRouter);
app.use(errorMiddleware);

export { app };
