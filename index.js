const express = require('express');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "secret key";

const view = require('./list-view-router.js');
const edit = require('./list-edit-router.js');
const { tasks } = require('./tasks');

app.use(express.json());

app.use('/view', view);
app.use('/edit', edit);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`); // Interpolación corregida
});

const users = [
    { email: "admin@example.com", name: "admin", rol: "admin" },
    { email: "user@example.com", name: "user", rol: "user" },
  ];
  
  app.use(express.json());

//GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks); // Asegúrate de usar "tasks" que es el nombre correcto de la variable
});

//POST /login
app.post("/login", (req, res) => {
    const email = req.body.email;
    const user = users.find((u) => u.email === email);
  
    if (!user) {
      return res.status(401).json({ error: "Invalid user name or password" });
    }
  
    // Generar token JWT con la información del usuario
    const token = jwt.sign(
      { email: user.email, rol: user.rol, name: user.name }, 
      SECRET_KEY, 
      {expiresIn: "1h"}
    );
  
    res.json({ token });
  });

  // Middleware para validar JWT
const JWTValidation = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
        return res.status(403).json({ error: "Invalid token" });
        }

        req.rol = decoded.rol; // Agregar el rol al objeto request
        next();
    });
};

// Ruta protegida solo accesible para admin
app.get("/protected", JWTValidation, (req, res) => {
    if (req.rol !== "admin") {
      return res.status(403).json({ error: "Access not allowed" });
    }
    res.json({ message: "protected list" });
});

// Middleware para aceptar solo métodos HTTP válidos
app.use((req, res, next) => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!validMethods.includes(req.method)) {
        return res.status(405).json({ message: 'Método HTTP no permitido.' });
    }
    next();
});
