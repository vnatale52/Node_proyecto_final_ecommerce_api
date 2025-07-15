// src/services/auth.service.js

import jwt from 'jsonwebtoken';
// Importamos dotenv para cargar las variables de entorno.
import dotenv from 'dotenv';

// Llamamos a config() al principio para cargar las variables.
dotenv.config();

/**
 * Servicio para autenticar un usuario y generar un token JWT.
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {object|null} Un objeto con el token si las credenciales son válidas, de lo contrario null.
 */
function loginUser(email, password) {
  try {
    console.log('Servicio: Validando credenciales.');

    const MOCK_USER_EMAIL = 'admin@tienda.com';
    const MOCK_USER_PASSWORD = 'admin123';

    if (email === MOCK_USER_EMAIL && password === MOCK_USER_PASSWORD) {
      const payload = {
        email: email,
        role: 'admin',
      };

      // Verificamos que la clave secreta exista antes de usarla.
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error('La clave secreta JWT_SECRET_KEY no está definida en el archivo .env');
      }

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: '60d' }
      );  // '60d'  días  o  '1h' hora o '5w'  semanas
  
      console.log('Servicio: Credenciales válidas. Token generado.');
      // Devolvemos el token en el formato estándar Bearer.
      return { token: `Bearer ${token}` };
    }

    console.log('Servicio: Credenciales inválidas.');
    return null;

  } catch (error) {
    // Capturamos cualquier error (como la falta de la clave secreta) y lo mostramos en consola.
    console.error("Error en el servicio de autenticación:", error.message);
    // Devolvemos null para que el controlador sepa que algo falló.
    // Esto es mejor que dejar que el error se propague y cause un crash.
    return null; 
  }
}

export default { loginUser };