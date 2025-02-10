const express = require('express');
const app = express();
const PORT = 3000;

const view = require('./list-view-router.js');
const edit = require('./list-edit-router.js');
const { tasks } = require('./tasks');

app.use('/view', view);
app.use('/edit', edit);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`); // Interpolación corregida
});

//GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks); // Asegúrate de usar "tasks" que es el nombre correcto de la variable
});

// Middleware para aceptar solo métodos HTTP válidos
app.use((req, res, next) => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!validMethods.includes(req.method)) {
        return res.status(405).json({ message: 'Método HTTP no permitido.' });
    }
    next();
});
