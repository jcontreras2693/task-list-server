const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`); // Interpolación corregida
});

const tasks = [  // Se cambió a "tasks" para ser más semántico
    {
        "id": 1,
        "isCompleted": false,
        "description": "Walk the dog",
    },
    {
        "id": 2,
        "isCompleted": false,
        "description": "Get a shower",
    },
    {
        "id": 3,
        "isCompleted": false,
        "description": "Make the bed",
    },
];

//GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks); // Asegúrate de usar "tasks" que es el nombre correcto de la variable
});
