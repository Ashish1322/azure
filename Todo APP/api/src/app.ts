import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import routes
import todoRoutes from "./routes/todo";

// Fetch env variables
dotenv.config({ path: "./src/.env" });
const port = process.env.PORT || 3000;

// Create app
const app = express();
app.use(express.json());

// Define Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Working Fine" });
});
app.use("/todos", todoRoutes);

// connect to db
mongoose
  .connect(process.env.DB_URL || "")
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log("Error connecting to db " + err.message));

// Start App
app.listen(port, () => console.log("Working Fine"));
