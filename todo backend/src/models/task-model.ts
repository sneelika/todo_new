import mongoose from "mongoose";
import taskSchemaProperties from "../schemaproperties/taskschema-properties";
import { AuthRequest } from "../middleware";
import { Response } from "express";
import { ITask } from "../types";
import User from "./user-model";

const taskSchema = new mongoose.Schema(taskSchemaProperties, {
  timestamps: true,
});

const Task = mongoose.model("Task", taskSchema);

export const getAllTasksFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const tasks = await Task.find({
      user: userId,
    });
    return tasks;
  } catch (error) {
    console.error("Error in getAllTasksFromModels:", error);
  }
};

export const getAllTasksByCategoryFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const { id } = request.params;
    const tasks = await Task.find({
      user: userId,
      categoryId: id,
    });
    return tasks;
  } catch (error) {
    console.error("Error in getAllTasksFromModels:", error);
  }
};

export const getAllCompletedTasksFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const tasks = await Task.find({
      user: userId,
      isCompleted: true,
    });
    return tasks;
  } catch (error) {
    console.error("Error in getAllCompletedTasksFromModels:", error);
  }
};

export const getTasksForTodayFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const todaysISODate = new Date();
    todaysISODate.setHours(0, 0, 0, 0);
    const tasks = await Task.find({
      user: userId,
      date: todaysISODate.toISOString(),
    });
    return tasks;
  } catch (error) {
    console.error("Error in getAllCompletedTasksFromModels:", error);
  }
};

export const createTaskFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const { name, date, categoryId }: ITask = request.body;

    const task = await Task.create({
      name,
      date,
      categoryId,
      user: userId,
    });
    return task;
  } catch (error) {
    console.error("Error in getAllCompletedTasksFromModels:", error);
  }
};

export const toggleTaskStatusFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { isCompleted } = request.body;
    const { id } = request.params;

    const task = await Task.updateOne(
      {
        _id: id,
      },
      {
        isCompleted: isCompleted,
      }
    );
  } catch (error) {
    console.error("Error in toggleTaskStatusFromModels:", error);
  }
};

export const deleteTaskFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { id } = request.params;
    await Task.deleteOne({
      _id: id,
    });
  } catch (error) {
    console.error("Error in deleteTaskFromModels:", error);
  }
};

export const editTaskFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { _id, categoryId, date, name }: ITask = request.body;
    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      }
    );
  } catch (error) {
    console.error("Error in editTaskFromModels:", error);
  }
};

export const shareTaskFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  const { taskId, sharedUserId } = request.body;

  try {
    const task = await Task.findById(taskId);
    const user = await User.findById(sharedUserId);

    if (!task || !user) {
      return response.status(404).json({ message: "Task or user not found" });
    }

    task.sharedWith.push({ user: sharedUserId, readOnly: true });
    await task.save();

    response.json({ message: "Task shared successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const viewSharedTaskFromModels = async (
  request: AuthRequest,
  response: Response
) => {
  const { userId } = request.params;

  try {
    const sharedTasks = await Task.find({ "sharedWith.user": userId });

    response.json({ sharedTasks });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export default Task;
