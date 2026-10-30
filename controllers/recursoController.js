const Recurso = require('../models/Recurso');

// 1. Ver todos los recursos (con filtros opcionales)
const obtenerRecursos = async (req, res) => {
  try {
    const { provincia, categoria } = req.query;
    let filtro = {};

    if (provincia) filtro.provincia = provincia;
    if (categoria) filtro.categoria = categoria;

    const recursos = await Recurso.find(filtro);
    res.json(recursos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los recursos', error });
  }
};

// 2. Crear un recurso nuevo
const crearRecurso = async (req, res) => {
  try {
    const nuevoRecurso = new Recurso(req.body);
    const recursoGuardado = await nuevoRecurso.save();
    res.status(201).json(recursoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el recurso', error });
  }
};

// 3. Actualizar un recurso existente (PUT)
const actualizarRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const recursoActualizado = await Recurso.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!recursoActualizado) {
      return res.status(404).json({ mensaje: 'Recurso no encontrado' });
    }
    
    res.json(recursoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el recurso', error });
  }
};

// 4. Eliminar un recurso (DELETE)
const eliminarRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const recursoEliminado = await Recurso.findByIdAndDelete(id);
    
    if (!recursoEliminado) {
      return res.status(404).json({ mensaje: 'Recurso no encontrado' });
    }
    
    res.json({ mensaje: 'Recurso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el recurso', error });
  }
};

module.exports = {
  obtenerRecursos,
  crearRecurso,
  actualizarRecurso,
  eliminarRecurso
};