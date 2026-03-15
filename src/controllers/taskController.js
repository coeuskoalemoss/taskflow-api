const Task = require("../models/task");
const store = require("../store");

function getTasks(req, res, next) {
  try {
    const userTasks = store.tasks.filter(t => t.userId === req.userId);
    res.json(userTasks);
  } catch (err) { next(err); }
}

function createTask(req, res, next) {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const task = new Task(title, description, req.userId);
    store.tasks.push(task);
    res.status(201).json(task);
  } catch (err) { next(err); }
}

function updateTask(req, res, next) {
  try {
    const task = store.tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (task.userId !== req.userId) return res.status(403).json({ error: "Not authorized" });
    const { title, description, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    res.json(task);
  } catch (err) { next(err); }
}

function deleteTask(req, res, next) {
  try {
    const taskIndex = store.tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });
   
    const task = store.tasks[taskIndex];
    if (task.userId !== req.userId) return res.status(403).json({ error: "Not authorized" });
    store.tasks.splice(taskIndex, 1);
    res.status(204).send();
  } catch (err) { next(err); }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
