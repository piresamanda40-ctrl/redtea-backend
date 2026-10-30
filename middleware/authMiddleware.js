const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // Obtener el header de autorización
  const authHeader = req.headers['authorization'];
  
  // El formato suele ser "Bearer <token>", extraemos solo el token
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token de autenticación.' });
  }

  try {
    // Verificar el token usando la clave secreta del .env
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado; // Guardamos los datos del usuario decodificados en la petición
    next(); // Continuar con la siguiente función (el controlador)
  } catch (error) {
    res.status(403).json({ mensaje: 'Token no válido o expirado.' });
  }
};

module.exports = { verificarToken };