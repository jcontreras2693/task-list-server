const { Router, query } = require("express");
const router = Router();

const { tasks } = require('./tasks');

// POST /tasks
router.post('/tasks', (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ message: 'La descripción de la tarea es requerida.' });
    }
    
    // Crear una nueva tarea
    const newTask = {
        id: tasks.length + 1,
        isCompleted: false,
        description
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id
router.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const { description, isCompleted } = req.body;
    
    const task = tasks.find(task => task.id === taskId);
    
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada.' });
    }
    
    // Actualizar la tarea
    task.description = description || task.description;
    task.isCompleted = (isCompleted !== undefined) ? isCompleted : task.isCompleted;
    
    res.status(200).json(task);
});

// DELETE /tasks/:id
router.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada.' });
    }
    
    tasks.splice(taskIndex, 1); // Eliminar la tarea
    res.status(200).json({ message: 'Tarea eliminada correctamente.' });
});

// Middleware para validar solicitudes POST y PUT
router.use('/tasks', (req, res, next) => {
    if ((req.method === 'POST' || req.method === 'PUT') && (!req.body || Object.keys(req.body).length === 0)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud no puede estar vacío.' });
    }

    if (req.method === 'POST') {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ message: 'La descripción de la tarea es requerida.' });
        }
    }

    if (req.method === 'PUT') {
        const { description, isCompleted } = req.body;
        if (description === undefined && isCompleted === undefined) {
            return res.status(400).json({ message: 'Se requiere al menos un atributo válido para actualizar la tarea.' });
        }
    }

    next();
});

module.exports = router;