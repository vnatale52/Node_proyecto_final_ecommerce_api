// src/controllers/auth.controller.js   - Para validar usuarios en base a su e-mail y password
//  reemplazamos   ../   por   #
import authService from '#services/auth.service.js';

/**
 * Controlador para manejar la petición de login.
 * @param {object} req - Objeto de petición.
 * @param {object} res - Objeto de respuesta.
 */
function login(req, res) {
  // Extraemos el email y la contraseña del cuerpo de la petición.
  const { email, password } = req.body;
  console.log('Controlador: Petición de login recibida para el email:', email);

  // Validación de entrada.
  if (!email || !password) {
    return res.status(400).json({ message: 'El e-mail y la contraseña son requeridos.' });
  }

  // Llamamos al servicio de autenticación.
  const result = authService.loginUser(email, password);

  if (result) {
    // Si el servicio devuelve un token, lo enviamos con un estado 200 OK.
    res.status(200).json(result);
  } else {
    // Si el servicio devuelve null, significa que la autenticación falló.
    // Enviamos un estado 401 Unauthorized.
    res.status(401).json({ message: 'Credenciales inválidas.' });
  }
}

export default { login };