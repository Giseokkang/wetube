import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  ChangePassword
} from "../controller/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, ChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
