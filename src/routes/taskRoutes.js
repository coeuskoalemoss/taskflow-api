const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getTasks, createTask, updateTask, deleteTask, getTask } = require("../controllers/taskController");

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
router.get("/:id", auth, getTask);

module.exports = router;
