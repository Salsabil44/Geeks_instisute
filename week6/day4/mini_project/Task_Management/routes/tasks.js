import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../tasks.json");

function readTasks() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}

function writeTasks(tasks) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

// GET 
router.get("/", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// GET by id
router.get("/:id", (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// POST
router.post("/", (req, res) => {
  const tasks = readTasks();
  const { title, description } = req.body;

  if (!title || !description)
    return res.status(400).json({ error: "Title and description are required" });

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT
router.put("/:id", (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  const { title, description, completed } = req.body;

  if (!title || !description)
    return res.status(400).json({ error: "Title and description are required" });

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description,
    completed: completed ?? tasks[taskIndex].completed,
  };

  writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE 
router.delete("/:id", (req, res) => {
  let tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  const deletedTask = tasks.splice(taskIndex, 1);
  writeTasks(tasks);
  res.json({ message: "Task deleted", deletedTask });
});

export default router;
