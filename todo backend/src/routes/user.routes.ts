import express from "express";

import {
  createUser,
  loginUser,
  logoutUser,
  newAccessToken,
} from "../handlers/user.handler";

const userRoutes = express.Router();

userRoutes.post("/create", createUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", logoutUser);
userRoutes.get("/new-token", newAccessToken);

export default userRoutes;
