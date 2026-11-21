const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  getRecursos,
  createRecurso,
  updateRecurso,
  deleteRecurso,
} = require('../controllers/resourceController');

router.get('/', getRecursos);
router.post('/', protect, isAdmin, createRecurso);
router.put('/:id', protect, isAdmin, updateRecurso);
router.delete('/:id', protect, isAdmin, deleteRecurso);

module.exports = router;