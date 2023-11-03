import { Request, Response } from "express";
import {
  handleNewUser,
  handleLoginUser,
  handleLogout,
  handleNewAccessToken,
} from "../models/user-model";

export const createUser = async (request: Request, response: Response) => {
  try {
    // console.log(request);
    await handleNewUser(request, response);
  } catch (error) {
    console.log("error in createUser", error);
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    // console.log(request);
    await handleLoginUser(request, response);
  } catch (error) {
    console.log("error in loginUser", error);
  }
};

export const logoutUser = async (request: Request, response: Response) => {
  try {
    await handleLogout(request, response);
  } catch (error) {
    console.log("error in logoutUser", error);
  }
};

export const newAccessToken = async (request: Request, response: Response) => {
  try {
    await handleNewAccessToken(request, response);
  } catch (error) {
    console.log("error in newAccessToken", error);
  }
};
