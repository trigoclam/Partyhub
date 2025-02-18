const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Configurar CORS para permitir cualquier origen
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

// Middleware para procesar JSON
app.use(express.json());

// Conexión a MongoDB
const MONGO_URI = 'mongodb://localhost:27017/partyhub';
mongoose.connect(MONGO_URI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error al conectar con MongoDB:', err));

// Rutas
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- Asegúrate de importar esto

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes); // <-- Asegúrate de agregar esto

// Ruta por defecto para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor de PartyHub en ejecución');
});

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
