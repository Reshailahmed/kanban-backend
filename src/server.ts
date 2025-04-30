import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tasksRouter from "./routes/tasks";
import columnsRouter from "./routes/columns";
import { seedDefaultColumns } from "./db/seedDefaultColumns";
import authRouter from "./routes/auth"; // <-- add this

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = "mongodb+srv://reshailahmed758pro:Reshail751998@reshailkanbanboard.6cns8jz.mongodb.net/?retryWrites=true&w=majority&appName=ReshailKanbanBoard";

// === Middleware ===
app.use(cors({
  origin: ["http://localhost:5174", "https://your-production-frontend-domain.com"], // allow local frontend + deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// === Routes ===
app.use("/tasks", tasksRouter);
app.use("/columns", columnsRouter);
app.use("/auth", authRouter); // <-- add this after tasks/columns routes

// === MongoDB Connection ===
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");
    await seedDefaultColumns(); // <-- Seed default columns if needed

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

// === Fallback route for unknown endpoints ===
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
