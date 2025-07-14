// src/app.js

// --- 1. IMPORTACIONES ---
// Express es el framework principal para construir el servidor web.
import express from 'express';
// CORS es un middleware para permitir o restringir las solicitudes de recursos en un servidor web desde un dominio diferente.
import cors from 'cors';
// Body-parser es un middleware que analiza los cuerpos de las solicitudes entrantes antes que tus manejadores.
import bodyParser from 'body-parser';
// Dotenv carga las variables de entorno desde un archivo .env a process.env.
import dotenv from 'dotenv';

// Importamos los enrutadores que definen las rutas para cada recurso. Reemplazado  ./ de ruta relativa por  #  que indica una ruta absoluta
import productRoutes from '#routes/products.routes.js';
import authRoutes from '#routes/auth.routes.js';

// --- 2. CONFIGURACIÓN INICIAL ---
// Carga las variables de entorno del archivo .env. Es crucial hacerlo al principio (después de las importaciones).
dotenv.config();

// Creamos una instancia de la aplicación Express.
const app = express();

// Definimos el puerto del servidor. Usamos el valor de la variable de entorno PORT, o 3000 como valor por defecto.
const PORT = process.env.PORT || 3000;

// --- 3. MIDDLEWARES GLOBALES ---
// Habilitamos CORS para todas las rutas, permitiendo que el frontend haga peticiones a nuestra API.
app.use(cors());

// Configuramos body-parser para que la API pueda entender y procesar cuerpos de petición en formato JSON.
// Esto nos permite acceder a los datos enviados en el body a través de `req.body`.
// Nota: express.json() es el reemplazo moderno, pero se usa body-parser para cumplir el requerimiento.
app.use(bodyParser.json());

// --- 4. RUTAS DE LA API ---
// Definimos una ruta raíz de bienvenida para una verificación rápida de que el servidor está en línea.
app.get('/', (req, res) => {
  res.status(200).json({ message: '¡Bienvenido a la API del E-Commerce!' });
});

// Montamos las rutas de productos bajo el prefijo '/api/products'.
// Cualquier petición que comience con '/api/products' será dirigida al enrutador 'productRoutes'.
app.use('/api/products', productRoutes);

// Montamos las rutas de autenticación bajo el prefijo '/auth'.
// Cualquier petición que comience con '/auth' será dirigida al enrutador 'authRoutes'.
app.use('/auth', authRoutes);


// --- 5. MIDDLEWARES DE MANEJO DE ERRORES ---
// Middleware para manejar rutas no encontradas (error 404).
// Se activará si ninguna de las rutas anteriores coincide con la petición del cliente.
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada. Por favor, verifica la URL.' });
});

// Middleware global para manejar errores internos del servidor (error 500).
// Express lo identifica como un manejador de errores porque recibe 4 argumentos (err, req, res, next).
// Capturará cualquier error no manejado en las rutas anteriores.
app.use((err, req, res, next) => {
  // Imprimimos el error en la consola del servidor para propósitos de depuración.
  console.error(err.stack);
  // Enviamos una respuesta genérica de error al cliente para no exponer detalles de la implementación.
  res.status(500).json({ message: 'Ha ocurrido un error inesperado en el servidor.' });
});

// --- 6. INICIO DEL SERVIDOR ---
// Ponemos el servidor a la escucha en el puerto definido.
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});