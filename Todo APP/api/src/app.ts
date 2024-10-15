import express, { Request, Response } from "express";
import dotenv from "dotenv";

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


// Start App
app.listen(port, () => console.log("Working Fine"));
