const express = require('express');
const bcrypt = require('bcryptjs'); // Usa bcryptjs para encriptar la contraseña
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// **Registro de usuario**
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        console.log("🔍 Datos recibidos en el backend:", { username, email, password, role });

        const assignedRole = role || 'user';

        const newUser = new User({
            username,
            email,
            password, //  Ahora se encripta automáticamente en `User.js`
            role: assignedRole
        });

        await newUser.save();
        res.json({ message: 'Usuario registrado exitosamente', user: newUser });

    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ message: 'Error en el registro', error: error.message });
    }
});


// **Inicio de sesión**
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("🔍 Datos recibidos en el backend:", { email, password }); //  Verificar qué se envía en el login

        if (!email || !password) {
            return res.status(400).json({ message: "Por favor, proporciona un correo y una contraseña" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        console.log("🔍 Usuario encontrado en la base de datos:", user); //  Verificar usuario encontrado
        console.log("🔑 Contraseña ingresada:", password);
        console.log("🔑 Contraseña en la BD:", user.password);

        // **Comparar la contraseña ingresada con la encriptada**
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Resultado de bcrypt.compare():", isMatch); //  Verifica si coincide

        if (!isMatch) {
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }

        // **Generar token JWT**
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'clave_secreta',
            { expiresIn: '1h' }
        );

        res.json({ message: "Inicio de sesión exitoso", token, role: user.role });

    } catch (error) {
        console.error("❌ Error en el login:", error);
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
});

router.post('/join-event/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta');
        
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Verificar si ya está apuntado
        if (user.eventsJoined.includes(eventId)) {
            return res.status(400).json({ message: "Ya estás apuntado a este evento" });
        }

        // Apuntar al usuario al evento
        user.eventsJoined.push(eventId);
        await user.save();

        res.json({ message: "Te has apuntado al evento correctamente", eventsJoined: user.eventsJoined });

    } catch (error) {
        res.status(500).json({ message: "Error al apuntarse al evento", error });
    }
});

//  Ruta para obtener los eventos a los que un usuario está apuntado
router.get('/my-events', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta');

        const user = await User.findById(decoded.id).populate('eventsJoined');
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json(user.eventsJoined);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener eventos", error });
    }
});


module.exports = router;
