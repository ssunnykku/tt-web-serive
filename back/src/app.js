import cors from "cors";
import express from "express";
import { userRouter } from "./routers/userRouter";
import { pointRouter } from "./routers/pointRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/",(req, res)=>{
  console.log(req,body);
  res.send("data project root api")
});
app.use(pointRouter);
app.use(userRouter)
app.use(errorMiddleware);


export {app};