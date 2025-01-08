import Task from "../models/Task.js";
import express from "express";

const router = express.Router();
// API routes (if needed)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Task deleted", result});
  } catch (error){
    res.status(500).json({ message: "Error to delete", error })
  }
})

// Create a new post (example route)
router.post("/", async (req, res) => {
  const task = req.body;
  try {
    const newTask = new Task(task);
    await newTask.save(); // Save the post to the database
    res.status(201).json(newTask); // Send the new post as a response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  
  try {
    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,          // Find by ID
      req.body,               // Update with the provided data
      { new: true, runValidators: true } // Options to return the updated document and validate
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})

export default router;
