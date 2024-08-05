import { NextApiRequest, NextApiResponse } from "next";
import Task from "@/model/Task";

let tasks: Task[] = []; // In-memory storage for tasks

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      // Return all tasks
      return res.status(200).json(tasks);

    case "POST":
      // Create a new task
      const newTask = new Task(
        Date.now(), // Unique ID based on current time
        req.body.title,
        req.body.description,
        req.body.persona,
        req.body.group,
        false
      );
      tasks.push(newTask);
      return res.status(201).json(newTask);

    case "PUT":
      // Update a task (e.g., change status)
      const { id, status } = req.body;
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        tasks[taskIndex].completed = status === "completed"; // Update status
        return res.status(200).json(tasks[taskIndex]);
      }
      return res.status(404).json({ message: "Task not found" });

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
