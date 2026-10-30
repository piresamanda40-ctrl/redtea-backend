const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

// Rutas de la API
const recursoRoutes = require('./routes/recursoRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/recursos', recursoRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.send('¡El servidor de RedTEA está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});