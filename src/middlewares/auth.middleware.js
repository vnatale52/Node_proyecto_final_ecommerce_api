// src/middlewares/auth.middleware.js

import jwt from 'jsonwebtoken';

/**
 * Middleware para verificar el token JWT en las cabeceras de autorización.
 * Si el token es válido, permite el paso a la siguiente función (controlador).
 * Si no, devuelve un error de autenticación.
 * @param {object} req - Objeto de petición.
 * @param {object} res - Objeto de respuesta.
 * @param {function} next - Función para pasar al siguiente middleware/controlador.
 */
function authMiddleware(req, res, next) {
  console.log('Middleware de Autenticación: Verificando token...');
  // Buscamos la cabecera 'Authorization'.
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    // Si no hay cabecera, el usuario no está autenticado.
    console.log('Middleware: Acceso denegado. No se proporcionó cabecera de autorización.');
    return res.status(401).json({ message: 'Acceso denegado. Se requiere token.' });
  }

  // La cabecera tiene el formato "Bearer <token>". Lo separamos para obtener solo el token.
  const token = authHeader.split(' ')[1];

  if (!token) {
    // Si la cabecera está, pero no tiene el formato correcto o no hay token.
    console.log('Middleware: Acceso denegado. Token mal formado.');
    return res.status(401).json({ message: 'Token mal formado o ausente.' });
  }

  try {
    // Intentamos verificar el token con nuestra clave secreta.
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Si el token es válido, 'verify' devuelve el payload decodificado. En informática y telecomunicaciones la carga útil(payload) es el conjunto de los datos transmitidos útiles, excluyendo otros datos o metadatos, que son enviados para facilitar la entrega del mensaje.
    // Guardamos el payload en el objeto de petición (req.user) para que los
    // controladores posteriores puedan acceder a la información del usuario (ej: su rol).
    req.user = decodedPayload;
    console.log('Middleware: Token válido. Acceso concedido.');
    
    // Pasamos al siguiente middleware o al controlador final de la ruta.
    next();
  } catch (error) {
    // Si 'verify' falla (token expirado, firma inválida), lanzará un error.
    console.error('Middleware: Error de verificación de token.', error.message);
    // Devolvemos un error 403 Forbidden, ya que el token proporcionado no es válido.
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
}

export default authMiddleware;