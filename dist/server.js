"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// === Importing Required Modules ===
// Express: Web framework for Node.js
// cors: Middleware to enable Cross-Origin Resource Sharing
// fs: Node.js File System module to handle file reading/writing
// path: Provides utilities for file and directory paths
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// === Initialize Express App ===
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001; // Define the port your server will run on
// === Define File Paths for Storing Data ===
// These will store the task and column data in JSON format
const TASKS_FILE = path_1.default.join(__dirname, "tasks.json");
const COLUMNS_FILE = path_1.default.join(__dirname, "columns.json");
// === Utility Function to Read JSON File ===
// Safely reads a file and returns its contents as a string.
// If the file doesn't exist or there's an error, it returns a default value ("[]").
function readFile(filePath, defaultValue = "[]") {
    try {
        return fs_1.default.readFileSync(filePath, "utf8");
    }
    catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return defaultValue;
    }
}
// === Utility Function to Write JSON File ===
// Converts a JS object to JSON and writes it to the specified file.
function writeFile(filePath, data) {
    try {
        const json = JSON.stringify(data, null, 2); // Beautify JSON with indentation
        fs_1.default.writeFileSync(filePath, json, "utf8");
    }
    catch (error) {
        console.error(`Error writing ${filePath}:`, error);
        throw error;
    }
}
// === Middleware Setup ===
app.use((0, cors_1.default)()); // Allow cross-origin requests from any origin
app.use(express_1.default.json()); // Automatically parse JSON bodies in incoming requests
// === TASK ROUTES ===
// GET /tasks - Read and return the list of tasks from the file
app.get("/tasks", (req, res) => {
    const data = readFile(TASKS_FILE);
    res.json(JSON.parse(data));
});
// POST /tasks - Write a new list of tasks to the file
app.post("/tasks", (req, res) => {
    try {
        writeFile(TASKS_FILE, req.body);
        res.json({ message: "Tasks saved" });
    }
    catch {
        res.status(400).json({ message: "Failed to save tasks" });
    }
});
// === COLUMN ROUTES ===
// GET /columns - Read and return the list of columns from the file
app.get("/columns", (req, res) => {
    const data = readFile(COLUMNS_FILE);
    res.json(JSON.parse(data));
});
// POST /columns - Write a new list of columns to the file
app.post("/columns", (req, res) => {
    try {
        writeFile(COLUMNS_FILE, req.body);
        res.json({ message: "Columns saved" });
    }
    catch {
        res.status(400).json({ message: "Failed to save columns" });
    }
});
// === Catch-All Route for Unmatched Endpoints ===
// Returns a 404 JSON response for any route not defined above
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});
// === Start the Express Server ===
// Begins listening on the specified port and logs a confirmation message
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
