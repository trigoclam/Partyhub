const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Importar el modelo Event

// Obtener todos los eventos
router.get('/', async (req, res) => {
    try {
        const events = await Event.find(); // Obtener todos los eventos desde MongoDB
        res.json(events); // Enviar los eventos como respuesta en formato JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los eventos', error });
    }
});

// Crear un nuevo evento
router.post('/', async (req, res) => {
    try {
        const newEvent = new Event(req.body); // Crear un nuevo evento con los datos recibidos
        const savedEvent = await newEvent.save(); // Guardar en la base de datos
        res.status(201).json(savedEvent); // Enviar el evento creado como respuesta
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
});

module.exports = router;
