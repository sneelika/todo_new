import { Response } from "express";
import { AuthRequest } from "../middleware";
import {
  deleteCategoryFromModels,
  createCategoryFromModels,
  getAllCategoriesFromModels,
  getCategoryByIdFromModels,
  updateCategoryFromModels,
} from "../models/category-model";

//Check how it works without the response parameter in the result

export const getAllCategories = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    // console.log(
    //   getAllCategoriesFromModels(request).then((result) => {
    //     console.log(result);
    //     return response.status(200).json(result);
    //   })
    // );
    const result = await getAllCategoriesFromModels(request, response);
    return response.status(200).json(result);
  } catch (error) {
    console.log("error in getAllCategories", error);
  }
};

export const getCategoryById = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const result = await getCategoryByIdFromModels(request, response);
    return response.status(200).json(result);
  } catch (error) {
    console.log("error in getCategoryById", error);
  }
};

export const createCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const result = await createCategoryFromModels(request, response);
    return response.status(200).json(result);
  } catch (error) {
    console.log("error in createCategory", error);
  }
};

export const deleteCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    await deleteCategoryFromModels(request, response);
    return response
      .status(200)
      .json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log("error in deleteCategory", error);
  }
};

export const updateCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    await updateCategoryFromModels(request, response);
    response.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.log("error in updateCategory", error);
  }
};
