require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de archivos estáticos (Imágenes, CSS, JS front-end)
app.use(express.static(path.join(__dirname)));

// Middleware para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta base
app.get('/', (req, res) => {
    res.send('🏛️ IA-CRÓPOLIS: Servidor Maestro Node.js Activo');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor Maestro escuchando en el puerto ${PORT}`);
});
