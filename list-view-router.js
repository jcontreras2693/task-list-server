const { Router, query } = require("express");
const router = Router();

const { tasks } = require('./tasks');

// GET /tasks
router.get('/tasks', (req, res) => {
    const { complete } = req.query;

    if (complete === undefined) {
        return res.json(tasks);
    }

    const isCompleted = complete === "true";

    const filteredTasks = tasks.filter(task => task.isCompleted === isCompleted);

    res.json(filteredTasks);
});

// GET /tasks/:id
router.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).send(`No se encontró la tarea con ID: ${id}`);
    }

    res.json(task);
});

module.exports = router;