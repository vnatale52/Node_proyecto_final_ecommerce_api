# API RESTful y Frontend para Gestión de E-Commerce

Este es un proyecto Full-Stack completo que implementa una API RESTful para el backend y una aplicación de una sola página (SPA) para el frontend, permitiendo la gestión integral de productos para una tienda en línea.

- **URL del Frontend Desplegado:** `https://frontend-proyecto-final-ecommerce-api.onrender.com/`
- **URL Base de la API Desplegada:** `https://backend-proyecto-final-ecommerce-api.onrender.com/`

## 📜 Descripción del Proyecto

El objetivo de este proyecto es proporcionar una solución de backend robusta y segura, junto con una interfaz de usuario funcional, para administrar el catálogo de productos de un E-Commerce. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los productos, protegiendo las operaciones de escritura mediante un sistema de autenticación basado en JSON Web Tokens (JWT).

La arquitectura está diseñada para ser escalable y mantenible, separando claramente las responsabilidades en distintas capas lógicas tanto en el backend como en el frontend.

## ✨ Características Principales

- **API RESTful Completa:** Endpoints claros y bien definidos para la gestión de productos y usuarios.
- **Arquitectura por Capas:** Código organizado en Rutas, Controladores, Servicios y Modelos.
- **Base de Datos en la Nube:** Utiliza **Firestore** de Google Firebase como base de datos NoSQL.
- **Autenticación y Seguridad:** Rutas protegidas con **JSON Web Tokens (JWT)**. Solo los usuarios autenticados pueden modificar los datos.
- **Frontend Interactivo:** Interfaz de usuario construida con **HTML, CSS y JavaScript puro (Vanilla JS)** que consume la API.
- **Modularidad:** Tanto el backend como el frontend están escritos con módulos de ES6 (`import`/`export`).
- **Despliegue Profesional:** Backend y Frontend desplegados como servicios separados en la nube.

## 🛠️ Stack Tecnológico

### Backend
- **Node.js:** Entorno de ejecución de JavaScript del lado del servidor.
- **Express.js:** Framework para la construcción de la API y el manejo de rutas.
- **Firebase (Firestore):** Base de datos NoSQL en la nube.
- **JSON Web Token (JWT):** Para la generación de tokens de acceso seguros.
- **CORS:** Middleware para permitir peticiones de origen cruzado.
- **Dotenv:** Para la gestión de variables de entorno.
- **Body-Parser:** Middleware para procesar el cuerpo de las peticiones JSON.

### Frontend
- **HTML5:** Para la estructura semántica de la aplicación.
- **CSS:** Para el diseño y la apariencia visual.
- **JavaScript (ES6+):** Para la lógica, interactividad y comunicación con la API.
- **Fetch API:** Para realizar las peticiones HTTP al backend.

## 🗂️ Estructura del Proyecto

El proyecto está dividido en dos partes principales: **backend** y **frontend**, cada uno en su propio repositorio.

### Estructura del Backend
/
├── src/
│ ├── app.js # Punto de entrada y configuración principal del servidor.
│ ├── config/ # Conexión a servicios externos (Firebase).
│ ├── controllers/ # Manejan las peticiones HTTP y las respuestas.
│ ├── middlewares/ # "Guardias de seguridad" para proteger rutas (ej: auth).
│ ├── models/ # Capa de acceso a datos (interactúa con Firestore).
│ ├── routes/ # Define los endpoints de la API.
│ └── services/ # Contiene la lógica de negocio.
├── .env.example # Archivo de ejemplo para las variables de entorno.
└── package.json # Manifiesto del proyecto, scripts y dependencias.

### Estructura del Frontend
/
├── public/
│ ├── index.html # Estructura principal de la aplicación.
│ ├── styles.css # Hoja de estilos.
│ └── js/ # Lógica de la aplicación.
│ ├── api.js # Módulo para comunicarse con la API del backend.
│ ├── ui.js # Módulo para manipular la interfaz de usuario.
│ └── main.js # Orquestador principal del frontend.

 Instalación y Ejecución Local
Para ejecutar este proyecto en tu máquina local, sigue estos pasos:
1. Clonar los Repositorios
# Clona el repositorio del backend
git clone https://github.com/vnatale52/backend_proyecto_final_ecommerce_api.git

# Clona el repositorio del frontend
git clone https://github.com/vnatale52/frontend_proyecto_final_ecommerce_api.git

2. Configurar el Backend
	1. Navega a la carpeta del backend: cd nombre-repo-backend
	2. Instala las dependencias: npm install
	3. Crea un archivo .env en la raíz del proyecto, basándote en el archivo .env.example.
	4. Rellena el archivo .env con tus propias credenciales de Firebase y una clave secreta para JWT.

		PORT=3000
		JWT_SECRET_KEY="tu_clave_secreta_super_segura_aqui"
		FIREBASE_API_KEY="..."
		FIREBASE_AUTH_DOMAIN="..."
		FIREBASE_PROJECT_ID="..."
		FIREBASE_STORAGE_BUCKET="..."
		FIREBASE_MESSAGING_SENDER_ID="..."
		FIREBASE_APP_ID="..."

	5. Inicia el servidor del backend en modo desarrollo:
npm run dev
El servidor estará escuchando en http://localhost:3000.

3. Configurar el Frontend
	1. Abre una nueva terminal y navega a la carpeta del frontend: cd nombre-repo-frontend
	2. Asegúrate de que la variable BASE_URL en el archivo public/js/api.js apunte a la URL de tu backend local (http://localhost:3000).
	3. Inicia un servidor estático para el frontend. La forma más sencilla es con npx:
npx serve public

4. Abre tu navegador y ve a la URL que te indique la consola (ej: http://localhost:3001).

A continuación se detallan las rutas disponibles en la API.

	Método  Ruta	      Descripción	                             Acceso	      Cuerpo de la Petición (Ejemplo)
	POST	  /auth/login  	Autentica a un usuario y devuelve un token.	Público	{"email": "...", "password": "..."}
	GET	  /api/products	Obtiene la lista completa de productos.	Público	N/A
	GET	  /api/products/:id	Obtiene un único producto por su ID.	Público	N/A
	POST	  /api/products	Crea un nuevo producto.	Protegido (JWT)	{"name": "...", "price": ...}
	PATCH	  /api/products/:id	Actualiza parcialmente un producto existente.	Protegido (JWT)	{"price": ...}
	DELETE  /api/products/:id	Elimina un producto por su ID.	Protegido (JWT)	N/A

Este proyecto fue desarrollado como parte de un programa de formación, demostrando habilidades en el desarrollo Full-Stack con Node.js y JavaScript.
¡Un gran paso para Vincenzo (aunque no lo sea para la humanidad). 

Autor:   Vincenzo Natale,  vnatale52@gmail.com,   Curso:  Back-End / Node JS, TT Adultos - 1C 2025





