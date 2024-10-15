import { Request, Response } from "express";
import { todoContainer } from "../db";

// import logger client
import {client} from "../logger"

const trackHttpRequest = (req : Request, res : Response) => {
  client.trackRequest({
    name: `${req.method} ${req.url}`,
    resultCode: res.statusCode.toString(),
    success: res.statusCode >= 200 && res.statusCode < 400,
    url: req.url,
    duration: 100, // Assuming you have some logic to calculate duration
   
  });
};


// Fetch all Todos
export const allTodos = async (req: Request, res: Response): Promise<void> => {
  trackHttpRequest(req,res)
  try 
  {
    client.trackEvent({ name: "Request", properties: { key: "allTodos", message:"Fetching the data"} })
    const {resources} = await todoContainer.items.readAll().fetchAll()
    res.status(200).json({success: true, todos: resources})
  }
  catch(error)
  {
    res.status(500).json({ message: "Failed to add todo", error });
    return;
  }
};

// Add a Todo
export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
   
    const { title, desc } = req.body; // Extract title and description from request body
    client.trackEvent({ name: "Request", properties: { key: "addTodo", message:"Adding the data", title, desc} })
    const {resource} = await todoContainer.items.create({
      title,
      completed: false,
      desc
    })
    res.status(201).json({ message: "Todo added", todo: resource });
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
    const {completed} = req.body;

    client.trackEvent({ name: "Request", properties: { key: "updateTodo", message:"Updating the data", id} })
    const {resource} = await todoContainer.item(id,completed).replace({
      completed: true,
      title:"helo",
      desc:"hi",
      id
    })
   
    res.status(200).json({ message: "Todo updated" });
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
    const { completed } = req.body; 
    client.trackEvent({ name: "Request", properties: { key: "deleteTodo", message:"Deleting Todo", id} })
    await todoContainer.item(id,completed).delete();
    res
      .status(200)
      .json({ message: "Todo deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
    return;
  }
};
