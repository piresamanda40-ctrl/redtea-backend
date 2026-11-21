const Resource = require('../models/Resource');

// GET /api/recursos (listar y filtrar recursos)
const getRecursos = async (req, res, next) => {
  try {
    const { categoria, provincia, q } = req.query;
    const filter = {};

    if (categoria) {
      filter.categoria = categoria;
    }

    if (provincia) {
      filter.provincia = provincia;
    }

    if (q) {
      filter.$or = [
        { nombre: { $regex: q, $options: 'i' } },
        { descripcion: { $regex: q, $options: 'i' } },
      ];
    }

    const recursos = await Resource.find(filter).sort({ createdAt: -1 });
    res.status(200).json(recursos);
  } catch (error) {
    next(error);
  }
};

// POST /api/recursos (crear recurso - protegido con protect e isAdmin)
const createRecurso = async (req, res, next) => {
  try {
    const nuevoRecurso = await Resource.create(req.body);
    res.status(201).json(nuevoRecurso);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: error.message });
    }
    next(error);
  }
};

// PUT /api/recursos/:id (actualizar recurso - protegido con protect e isAdmin)
const updateRecurso = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recursoActualizado = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!recursoActualizado) {
      return res.status(404).json({ mensaje: 'Recurso no encontrado' });
    }

    res.status(200).json(recursoActualizado);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ mensaje: 'ID de recurso no válido' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: error.message });
    }
    next(error);
  }
};

// DELETE /api/recursos/:id (eliminar recurso - protegido con protect e isAdmin)
const deleteRecurso = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recursoEliminado = await Resource.findByIdAndDelete(id);

    if (!recursoEliminado) {
      return res.status(404).json({ mensaje: 'Recurso no encontrado' });
    }

    res.status(200).json({ mensaje: 'Recurso eliminado correctamente' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ mensaje: 'ID de recurso no válido' });
    }
    next(error);
  }
};

module.exports = {
  getRecursos,
  createRecurso,
  updateRecurso,
  deleteRecurso,
};