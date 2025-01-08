import Task from "../models/Task.js";
import express from "express";

const router = express.Router();
// API routes (if needed)
router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Fetch all tasks
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

// Create a new post (example route)
router.post("/test", async (req, res) => {
  const task = req.body;
  try {
    const newTask = new Task(task);
    await newTask.save(); // Save the post to the database
    res.status(201).json(newTask); // Send the new post as a response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
