import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDatabase from "./db";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { authMiddleware } from "./middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

connectToDatabase();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/ping", (request: Request, response: Response) => {
  response.send("Pong");
});

app.use("/users", userRoutes);
app.use("/categories", authMiddleware, categoryRoutes);
app.use("/tasks", authMiddleware, taskRoutes);

app.all("*", (request: Request, response: Response) => {
  response.status(404);
  if (request.accepts("json")) return response.send({ error: "404|not found" });
  response.send("404|not found");
});

// app.listen(process.env.PORT, () => {
//   console.log("Server up and running");
// });
export default app;
