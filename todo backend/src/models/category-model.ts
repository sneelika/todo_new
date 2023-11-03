import mongoose from "mongoose";
import { Response } from "express";
import categorySchemaProperties from "../schemaproperties/categoryschema-properties";
import { AuthRequest } from "../middleware";
import { ICategory } from "../types";
import Task from "../models/task-model";

const categorySchema = new mongoose.Schema(categorySchemaProperties);

const Category = mongoose.model("Category", categorySchema);

export const getAllCategoriesFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  const { user } = request;
  try {
    const categories = await Category.find({
      user: user,
    });
    return categories;
  } catch (error) {
    console.error("Error in getAllCategoriesFromModels:", error);
  }
};

export const getCategoryByIdFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  const { user } = request;
  const { id } = request.params;
  try {
    const category = await Category.findOne({
      _id: id,
    });
    return category;
  } catch (error) {
    console.error("Error in getCategoryByIdFromModels:", error);
  }
};

export const createCategoryFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { color, icon, name }: ICategory = request.body;
    const { user } = request;

    const category = await Category.create({
      color,
      icon,
      name,
      user,
    });
    return category;
  } catch (error) {
    console.error("Error in createCategoryFromModels:", error);
  }
};

export const deleteCategoryFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { id } = request.params;
    await Task.deleteMany({
      categoryId: id,
    });
    const category = await Category.deleteOne({
      _id: id,
    });
  } catch (error) {
    console.error("Error in deleteCategoryFromModels:", error);
  }
};

export const updateCategoryFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { _id, color, icon, isEditable, name }: ICategory = request.body;
    await Category.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          color,
          icon,
          isEditable,
        },
      }
    );
  } catch (error) {
    console.error("Error in updateCategoryFromModels", error);
  }
};

export default Category;
