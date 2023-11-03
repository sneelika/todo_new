import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REFRESH_TOKEN } from "../constants/tokens";

export const getAccessToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign(
    { _id },
    process.env.ACCESS_SECRET_KEY,
    {
      expiresIn: "30s",
    }
  );
  return authenticatedUserToken;
};

export const getRefreshToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign(
    { _id },
    process.env.REFRESH_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  return authenticatedUserToken;
};

export const saveRefreshToken = async (refresh_token) => {
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN, refresh_token);
    console.log("Refresh token saved successfully.");
  } catch (error) {
    console.error("Error saving refresh token:", error);
  }
};
