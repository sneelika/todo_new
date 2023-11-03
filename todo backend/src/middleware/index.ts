import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/user-model";

export interface AuthRequest extends Request {
  user: string;
}

export const authMiddleware = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(401).json({
        error: "Authorization is required",
      });
    }
    const token = authorization;
    console.log(token);
    const { _id } = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    const existingUser = await User.findOne({ _id });

    if (existingUser) {
      request.user = existingUser.id;
    }
    next();
  } catch (error) {
    console.log("error in authenticationMiddleware", error);
    throw error;
  }
};
