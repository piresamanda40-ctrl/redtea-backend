const express = require('express');
const router = express.Router();
const { 
  obtenerRecursos, 
  crearRecurso, 
  actualizarRecurso, 
  eliminarRecurso 
} = require('../controllers/recursoController');
const { verificarToken } = require('../middleware/authMiddleware'); // <-- Importamos el middleware

// Ruta pública (cualquier persona puede ver la lista de recursos)
router.get('/', obtenerRecursos);

// Rutas protegidas (requieren enviar el token JWT en los headers)
router.post('/', verificarToken, crearRecurso);
router.put('/:id', verificarToken, actualizarRecurso);
router.delete('/:id', verificarToken, eliminarRecurso);

module.exports = router;