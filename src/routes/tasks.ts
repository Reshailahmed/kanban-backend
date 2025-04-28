import express from "express";
import { Task } from "../models/Task";

const router = express.Router();

// GET /tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  try {
    await Task.deleteMany({});
    await Task.insertMany(req.body);
    res.json({ message: "Tasks saved" });
  } catch (error) {
    res.status(400).json({ message: "Failed to save tasks" });
  }
});

export default router;
