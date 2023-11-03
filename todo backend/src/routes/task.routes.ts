import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllCompletedTasks,
  getAllTasks,
  getAllTasksByCategory,
  getTasksForToday,
  toggleTaskStatus,
  shareTask,
  viewSharedTask,
} from "../handlers/task.handler";

const taskRoutes = express.Router();

taskRoutes.get("/", getAllTasks);
taskRoutes.get("/tasks-by-categories/:id", getAllTasksByCategory);
taskRoutes.get("/completed", getAllCompletedTasks);
taskRoutes.get("/today", getTasksForToday);
taskRoutes.post("/create", createTask);
taskRoutes.put("/update/:id", toggleTaskStatus);
taskRoutes.delete("/:id", deleteTask);
taskRoutes.put("/edit/:id", editTask);
taskRoutes.put("/share", shareTask);
taskRoutes.get("/view-shared-tasks/:userId", viewSharedTask);

export default taskRoutes;
