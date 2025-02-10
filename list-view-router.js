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

// Middleware para validar parámetros en list-view-router
router.use('/tasks/:id', (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'ID inválido. Debe ser un número entero positivo.' });
    }
    next();
});

module.exports = router;