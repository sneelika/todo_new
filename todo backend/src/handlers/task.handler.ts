import { Response } from "express";
import { AuthRequest } from "../middleware";
import {
  createTaskFromModels,
  deleteTaskFromModels,
  editTaskFromModels,
  getAllCompletedTasksFromModels,
  getAllTasksByCategoryFromModels,
  getAllTasksFromModels,
  getTasksForTodayFromModels,
  toggleTaskStatusFromModels,
  viewSharedTaskFromModels,
} from "../models/task-model";

export const getAllTasks = async (request: AuthRequest, response: Response) => {
  try {
    const result = await getAllTasksFromModels(request, response);
    return response.status(200).json(result);
  } catch (error) {
    console.log("error in getAllTasks", error);
  }
};

export const getAllTasksByCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const result = await getAllTasksByCategoryFromModels(request, response);
    return response.status(200).json(result);
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
  }
};

export const getAllCompletedTasks = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const result = await getAllCompletedTasksFromModels(request, response);
    return response.status(200).json(result);
  } catch (error) {
    console.log("error in getAllCompletedTasks", error);
  }
};

export const getTasksForToday = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const result = await getTasksForTodayFromModels(request, response);
    return response.status(200).json(result);
  } catch (error) {
    console.log("error in getTasksForToday", error);
  }
};

export const createTask = async (request: AuthRequest, response: Response) => {
  try {
    const result = await createTaskFromModels(request, response);
    return response.status(200).json(result);
  } catch (error) {
    console.log("error in createTask", error);
  }
};

export const toggleTaskStatus = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    await toggleTaskStatusFromModels(request, response);
    return response.status(200).json({ message: "Task status updated" });
  } catch (error) {
    console.log("error in toggleTaskStatus", error);
  }
};

export const deleteTask = async (request: AuthRequest, response: Response) => {
  try {
    await deleteTaskFromModels(request, response);
    response.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.log("error in deleteTask", error);
  }
};

export const editTask = async (request: AuthRequest, response: Response) => {
  try {
    await editTaskFromModels(request, response);
    response.status(200).json({ message: "Task Edited" });
  } catch (error) {
    console.log("error in editTask", error);
  }
};

export const shareTask = async (request: AuthRequest, response: Response) => {
  try {
    await shareTask(request, response);
    response.status(200).json({ message: "Task Shared" });
  } catch (error) {
    console.log("error in shareTask", error);
  }
};

export const viewSharedTask = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    await viewSharedTaskFromModels(request, response);
    response.status(200).json({ message: "Task Viewed" });
  } catch (error) {
    console.log("error in viewSharedTask", error);
  }
};
