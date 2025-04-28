import express from "express";
import { Column } from "../models/Column";

const router = express.Router();

// GET /columns
router.get("/", async (req, res) => {
  try {
    const columns = await Column.find();
    res.json(columns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching columns" });
  }
});

// POST /columns
router.post("/", async (req, res) => {
  try {
    await Column.deleteMany({});
    await Column.insertMany(req.body);
    res.json({ message: "Columns saved" });
  } catch (error) {
    res.status(400).json({ message: "Failed to save columns" });
  }
});

export default router;
