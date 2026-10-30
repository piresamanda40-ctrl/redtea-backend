const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/authController');

// Rutas de autenticación
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;