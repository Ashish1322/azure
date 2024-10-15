import express from "express";
import { allTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todo";

const router = express.Router();

// Define your routes with the correct method
router.get("/", allTodos); // Fetch all todos
router.post("/", addTodo); // Add a new todo
router.put("/:id", updateTodo); // Update a specific todo
router.delete("/:id", deleteTodo); // Delete a specific todo

export default router;
