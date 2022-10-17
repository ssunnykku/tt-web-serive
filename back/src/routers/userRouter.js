import { Router } from "express";
const userRouter = Router();
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";
import is from "@sindresorhus/is";
import multer from "multer";

const storage = multer.memoryStorage();

//0. img limit
const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|png)$/)) {
      return cb(new Error(" please upload a Jpeg or png"));
    }
    cb(undefined, true);
  },
  storage: storage,
});

//  1. 회원가입 라우터
userRouter.post("/register", async (req, res, next) => {
  try {
    //헤더에 json타입이 명시되지 않으면 req보낸 payload(body)내용이 빈배열이 반환될 수 있다.
    //JS object는 json 타입으로 데이터 전송이 가능하다.
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

// 2. 로그인 라우터
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
//3.📌 없어도 되는 로직 나중에 한번 확인해보기
//로그인한 유저 한명 정보 가져오기- (:id 파라미터로 찾는거 필요 없는게 이번엔 챌린지 id페이지 접근이라 )
//챌린지id를 파라미터로 받아서 챌린지 get 하는건 필요
userRouter.get("/currentUser", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;

    const currentUser = await userService.findCurrentUser({ userId });

    if (currentUser.errorMessage) {
      throw new Error(currentUser.errorMessage);
    }
    res.status(200).json(currentUser);
  } catch (error) {
    next(error);
  }
});

// 4. 비밀번호수정
userRouter.put("/passwordUpdate", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    //const userId=req.params.userId;
    const password = req.body.password;

    const updatePW = await userService.updatePW({ userId, password });
    res.status(201).json(updatePW);
  } catch (error) {
    next(error);
  }
});

//5. 유저정보 수정
userRouter.put("/userUpdate", loginRequired, async (req, res, next) => {
  try {
    //const  userId  = req.params.userId;
    const userId = req.currentUserId;
    const { name, description } = req.body;
    const updatedUser = await userService.updateUser(userId, name, description);
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//6. 회원탈퇴(withdrawal 수정)-> 아직 완료 전
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

// get 이미지 // null일 때 error반환!!...프론트에 해당내용 공유드리기
userRouter.get("/userImg", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const getImg = await userService.getCurrentImg({ userId });
    res.status(200).send(getImg);
  } catch (error) {
    next(error);
  }
});
/*
//add img
userRouter.post(
  "/userImg",
  loginRequired,
  upload.single("image"),
  async (req, res, next) => {
    try {
      // console.log(req.file);
      // const img = req.file.buffer;
      const img = 1;
      console.log("imgaddrouter: ", img);
      const userId = req.currentUserId;
      const addImg = await userService.addUserImg({
        img,
        userId,
      });
      if (addImg.errorMessage) {
        throw new Error(addImg.errorMessage);
      }

      res.status(201).send(addImg);
    } catch (error) {
      next(error);
    }
  }
);
*/
//img update
userRouter.put(
  "/userImg",
  loginRequired,
  upload.single("image"),
  async (req, res, next) => {
    try {
      // console.log(req.file);
      // const img = req.file.buffer;
      const img = 1;
      console.log("imgupdaterouter: ", img);
      const userId = req.currentUserId;
      const updateImg = await userService.updateUserImg({
        img,
        userId,
      });
      if (updateImg.errorMessage) {
        throw new Error(updateImg.errorMessage);
      }

      res.status(201).send("Image updated successfully!");
    } catch (error) {
      next(error);
    }
  }
);

// delete profile img
userRouter.delete("/userImg", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const deleteImg = await userService.removeUserImg({
      userId,
    });
    if (deleteImg.errorMessage) {
      throw new Error(deleteImg.errorMessage);
    }
  } catch (error) {
    next(error);
  }
});

export { userRouter };
