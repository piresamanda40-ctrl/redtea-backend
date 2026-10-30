const express = require('express');
const router = express.Router();
const { obtenerRecursos, crearRecurso } = require('../controllers/recursoController');

// Ruta para ver los recursos: GET /api/recursos
router.get('/', obtenerRecursos);

// Ruta para crear un recurso: POST /api/recursos
router.post('/', crearRecurso);

module.exports = router;