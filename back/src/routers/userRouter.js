import { Router } from "express";
const userRouter = Router();
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";
import is from "@sindresorhus/is";
// import multer from "multer";
import assert from "assert";
import { config } from "dotenv";
import { addImage } from "../middlewares/addImage";
import { executionAsyncId } from "async_hooks";
const path = require("path");

// const upload = addImage("uploads");

userRouter.post("/register", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "header의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const name = req.body.name;
    const newUser = await userService.addUser({
      email,
      password,
      confirmPassword,
      name,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser, errorMessage);
    }

    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userService.userLogin({ email, password });
    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/currentUser", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const currentUser = await userService.findCurrentUser({ userId });

    if (currentUser.errorMessage) {
      throw new Error(currentUser.errorMessage);
    }
    res.status(200).json(currentUser);
    console.log(currentUser.img);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/passwordUpdate", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const password = req.body.password;

    const updatePW = await userService.updatePW({ userId, password });
    res.status(201).json(updatePW);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/userUpdate", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { name, description } = req.body;
    const updatedUser = await userService.updateUser(userId, name, description);
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.json({ message: error.message });
  }
});

userRouter.put(
  "/withdrawal/:id",
  loginRequired,
  async function (req, res, next) {
    try {
      const withdrawal = req.body.withdrawal ?? null;
      const userId = req.currentUserId;
      const id = req.params.id;

      const idStatus = await userService.userWithdrawal({
        userId,
        id,
        withdrawal,
      });
      res.status(200).json(idStatus);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/userImg", loginRequired, async (req, res, next) => {
  try {
    // const imgUrl = "http://localhost:3000/images/";
    const userId = req.currentUserId;
    const getImg = await userService.getCurrentImg({ userId });
    // const result = imgUrl + getImg;

    res.status(200).send(getImg);
  } catch (error) {
    next(error);
  }
});

userRouter.put(
  "/userImg",
  loginRequired,
  // upload.single("img"),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      // const img = req.file.path;
      // console.log(req.body.img.split(";")[0].split("/")[1]);
      // 64진법으로 인코딩??
      const ext = req.body.img.split(";")[0].split("/")[1];
      const base64Data = Buffer.from(req.body.img, "base64");
      const fsPromises = require("fs/promises");
      await fsPromises.writeFile(
        `uploads/${userId + "_" + Date.now()}.${ext}`,
        base64Data
      ); // "경로 및 파일명", base64Data

      // console.log(req.body.img);
      // console.log(base64Data);
      // if (img === undefined) {
      //   return res.status(400).send("이미지가 존재하지 않습니다.");
      // }
      // console.log("1. 라우터 : ", base64Data);
      const EditImg = await userService.updateUserImg({
        userId,
        img: `${userId + "_" + Date.now()}.${ext}`,
      });
      res.status(200).json({ EditImg });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put("/userImg/delete", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const deleteImg = await userService.removeUserImg({
      userId,
    });
    if (deleteImg.errorMessage) {
      throw new Error(deleteImg.errorMessage);
    }
    res.status(204).send("Image delete successfully!");
  } catch (error) {
    next(error);
  }
});

export { userRouter };
