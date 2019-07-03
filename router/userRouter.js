import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  ChangePassword
} from "../controller/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, ChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
