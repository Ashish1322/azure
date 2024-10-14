import { Request, Response } from "express";
import Todo from "../modals/Todo"; // Adjust the path as needed

// Fetch all Todos
export const allTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find(); // Find all todos
    res.status(200).json({ message: "All Todos", todos });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
    return;
  }
};

// Add a Todo
export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, desc } = req.body; // Extract title and description from request body
    const newTodo = new Todo({ title, desc });
    await newTodo.save();
    res.status(201).json({ message: "Todo added", todo: newTodo });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to add todo", error });
    return;
  }
};

// Update a Todo
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json({ message: "Todo updated", todo: updatedTodo });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error });
    return;
  }
};

// Delete a Todo
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
    return;
  }
};
