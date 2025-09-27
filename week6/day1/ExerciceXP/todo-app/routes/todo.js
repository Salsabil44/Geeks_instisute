const express = require("express");
const router = express.Router();

// Sample in-memory "database"
let todos = [];
let nextId = 1;

// GET all to-do items
router.get("/", (req, res) => {
  res.json(todos);
});

// POST: Create a new to-do item
router.post("/", (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTodo = { id: nextId++, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT: Update a to-do item by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE: Delete a to-do item by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json(deletedTodo[0]);
});

module.exports = router;