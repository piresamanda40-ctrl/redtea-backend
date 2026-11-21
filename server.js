const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resourceRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/recursos', resourceRoutes);

// Ruta de prueba general
app.get('/', (req, res) => {
  res.send('Servidor de RedTEA funcionando correctamente');
});

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Middleware global de gestión de errores
app.use((err, req, res, next) => {
  console.error('❌ Error en el servidor:', err.stack);
  res.status(err.status || 500).json({
    mensaje: err.message || 'Error interno del servidor',
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('🔴 Falta MONGO_URI en el archivo .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado exitosamente a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('🔴 Error conectando a MongoDB:', err.message);
    process.exit(1);
  });