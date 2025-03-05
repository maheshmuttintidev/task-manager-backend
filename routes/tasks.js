const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Middleware to protect routes
router.use(authMiddleware);

// @route POST /tasks
// @desc Create a new task
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({
      user: req.user.id,
      title,
      description,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route Route GET /tasks
// @desc Get all tasks for the logged-in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /tasks/:id
// @desc Get a specific task
router.get('/:id', async (req, res) => {
  if (!req.params?.id) {
    return res.status(401).json({ message: 'Task is required' });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route PUT /tasks/:id
// @desc Update a task
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  if (!req.params?.id) {
    return res.status(401).json({ message: 'Task is required' });
  }
  try {
    let task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route DELETE /tasks/:id
// @desc Delete a task
router.delete('/:id', async (req, res) => {
  try {
    if (!req.params?.id) {
      return res.status(401).json({ message: 'Task is required' });
    }
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne({ id: req.params.id });
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
