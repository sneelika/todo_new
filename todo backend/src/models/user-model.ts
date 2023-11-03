import mongoose from "mongoose";
import { Response } from "express";
import userSchemaProperties from "../schemaproperties/userschema-properties";
import { Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../types";
import {
  getAccessToken,
  getRefreshToken,
  saveRefreshToken,
} from "../utils/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REFRESH_TOKEN } from "../constants/tokens";

const userSchema = new mongoose.Schema(
  userSchemaProperties,

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

/// Register New User
export const handleNewUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).send("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in createUserFromModels:", error);
  }
};

/// Login  User
export const handleLoginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(409).send({ message: "User doesn't exist" });
    }

    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordIdentical) {
      return response.status(400).send({ message: "Wrong credentials" });
    }

    //Generate access token and refresh token

    const access_token = getAccessToken(existingUser._id);
    const refresh_token = getRefreshToken(existingUser._id);

    console.log(access_token);
    console.log(refresh_token);

    console.log(existingUser);
    console.log(existingUser._id);

    // Databse query to update the refresh token

    const filter = { _id: existingUser._id };
    const update = { refreshToken: refresh_token, logged_at: new Date() };

    const result = await User.findOneAndUpdate(filter, update, { new: true });

    console.log(result);

    // Save the refresh token to AsyncStorage
    const save_refresh_token = await saveRefreshToken(refresh_token);
    console.log(save_refresh_token);

    return response.status(200).json({
      access_token,
      user: {
        email: existingUser.email,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.error("Error in loginUserFromModels:", error);
  }
};

export const handleNewAccessToken = async (
  request: Request,
  response: Response
) => {
  console.log("requesting new access token");

  // Get the refresh token
  const refresh_token_from_async_storage = await AsyncStorage.getItem(
    REFRESH_TOKEN
  );

  //Search for token in the async storage
  if (!refresh_token_from_async_storage) {
    console.log("Invalid refresh token :", refresh_token_from_async_storage);
    return response.status(401).json({ message: "Invalid token" });
  }

  const refresh_token = refresh_token_from_async_storage;
  console.log(refresh_token);

  const auth = await User.findOne({ refreshToken: refresh_token });

  if (!auth) {
    console.log("invalid refresh token :", refresh_token);
    return response.status(403).json({ message: "Invalid token" });
  }

  await jwt.verify(
    refresh_token,
    process.env.REFRESH_SECRET_KEY,
    (err, decoded) => {
      console.log("decoded ", decoded);
      console.log("auth ", auth);
      console.log("Auth ID: ", auth._id, "Decoded ID: ", decoded._id);

      if (err || auth._id.toString() !== decoded._id) {
        console.log("requesting new access token failed invalid token");
        return response.status(403).json({ message: "Invalid token" });
      }

      // Check: check if need to update refresh token also
      const access_token = getAccessToken(auth._id);
      console.log("new access token getting sucessfully");
      return response.status(200).json({
        message: "Refresh token successful",
        access_token: access_token,
      });
    }
  );
};

export const handleLogout = async (request: Request, response: Response) => {
  const refresh_token_from_async_storage = await AsyncStorage.getItem(
    REFRESH_TOKEN
  );
  console.log("Refresh Token :", refresh_token_from_async_storage);

  if (!refresh_token_from_async_storage) {
    return response.status(204).json({ message: "No token found" });
  }

  const refresh_token = refresh_token_from_async_storage;

  const auth = await User.findOne({ refreshToken: refresh_token });

  if (!auth) {
    return response.status(404).json({ message: `User does not exist...` });
  }

  const result = await User.findOneAndUpdate(
    { refreshToken: refresh_token },
    { $set: { refreshToken: null } }
  );

  console.log(result);

  await AsyncStorage.removeItem(REFRESH_TOKEN);
  return response.status(200).json({
    message: "Logout successful",
  });
};

export default User;
