Título del Proyecto:  API RESTful  para E-Commerce:

Esta aplicación incluye tanto el código del backend como el códido de fronted (pretendiéndose convertir en una modesta app fullstack).

La mimsa consiste en una API RESTful, desarrollada con Node.js  y  el framework Express. 
Su propósito es servir como el backend para una tienda en línea, permitiendo la gestión completa de productos (CRUD: Crear, Leer, Actualizar, Eliminar) y protegiendo las operaciones sensibles mediante un sistema de autenticación basado en JSON Web Tokens (JWT).

La arquitectura está diseñada para ser escalable y mantenible, separando las responsabilidades en distintas capas lógicas. 
Los datos de la aplicación se almacenan en una base de datos NoSQL en la nube, utilizando el servicio Firestore de Google Firebase.

Tecnologías Utilizadas:   Node.js,  Express, Firestore, JWT. 

Estructura de Carpetas y Archivos:
A continuación se detalla la estructura completa del proyecto, explicando la importancia y la función de cada archivo clave. Se indican la carpeta del proyecto y sus subcarpetas.

Backend_proyecto_final_ecomerce_api/
  
¦
__ node_modules/             # (Carpeta autogenerada) Contiene todas las dependencias del proyecto.
¦
__ src/                      # Carpeta principal que contiene todo el código fuente de la aplicación.
¦   ¦
¦   __ app.js                # Corazón y punto de entrada de la aplicación.
¦   ¦
¦   __ config/
¦   ¦   __ firebase.config.js    # Configuración y conexión a servicios externos (Firebase).
¦   ¦
¦   __ controllers/
¦   ¦   __ auth.controller.js    #  Lógica para manejar las peticiones de autenticación.
¦   ¦   __ product.controller.js # Lógica para manejar las peticiones relacionadas con productos.
¦   ¦
¦   __ middlewares/
¦   ¦   __ auth.middleware.js    # Middleware de seguridad para proteger rutas.
¦   ¦
¦   __ models/
¦   ¦   __ product.model.firestore.js   # Interacción directa con la base de datos para productos.
¦   ¦
¦   __ routes/
¦   ¦   __ auth.routes.js            #  Define las rutas de autenticación (ej: /login).
¦   ¦   __ products.routes.js        #  Define las rutas para los productos (ej: /api/products).
¦   ¦
¦   __ services/
¦       __ auth.service.js           # Lógica de negocio para la autenticación.
¦       __ product.service.js        # Lógica de negocio para los productos.
¦  
__ .env                              #  (Archivo local, no se sube al repositorio) Almacena las variables de entorno y secretos (PORT,                                                    JWT SECRET KEY y las correspondientes a Firebase).

__ .gitignore                        #  Especifica qué archivos y carpetas ignorar en Git.
__ package.json                      #  Manifiesto del proyecto: dependencias, scripts y metadatos.
__ package-lock.json                 #  (Autogenerado) Registra las versiones exactas de las dependencias.
__ README.md                         #  Documentación principal del proyecto.



Descripción Detallada de Archivos y Responsabilidades:

Raíz del Proyecto (/)

package.json:   Es el archivo más importante de un proyecto Node.js.  Define el nombre del proyecto, la versión, y lo más crucial:  los scripts para ejecutar tareas (npm start, npm run dev) y las dependencias (librerías como Express, Firebase, JWT) que el proyecto necesita para funcionar.

.env:   Archivo de configuración fundamental para la seguridad. Almacena "secretos" como las credenciales de la base de datos y la clave para firmar los JWT. Al estar listado en .gitignore, se evita que esta información sensible se suba a repositorios públicos.

.gitignore:   Esencial para mantener el repositorio limpio y seguro. Le dice a Git que ignore la carpeta node_modules (que puede ser muy pesada) y el archivo .env.

Código Fuente (/src/)

app.js:  Punto de Entrada Principal. Este archivo crea el servidor Express, configura los middlewares globales (como cors para permitir peticiones de otros dominios y body-parser para entender JSON), monta las diferentes rutas de la API y define los manejadores de errores generales (como el error 404 para rutas no encontradas). Es el orquestador principal de la aplicación.

Capa de Configuración (/src/config/)

firebase.config.js: Su única responsabilidad es inicializar la conexión con Firebase. Lee las credenciales del archivo .env y exporta la instancia de la base de datos (db), que será utilizada por los modelos para interactuar con Firestore.

Capa de Rutas (/src/routes/)

products.routes.js y auth.routes.js: Definen los Endpoints de la API. Actúan como una tabla de contenidos para la API. Cada archivo asocia una URL y un método HTTP (ej: GET /api/products/:id) con una función específica del controlador. También es donde se aplica el middleware de autenticación a las rutas que necesitan ser protegidas.

Capa de Controladores (/src/controllers/)

product.controller.js y auth.controller.js: Manejan las Peticiones y Respuestas. Son el puente entre el mundo exterior (HTTP) y la lógica de la aplicación. Extraen datos de la petición (req.params, req.body), llaman a los servicios correspondientes para procesar la solicitud y, finalmente, envían una respuesta al cliente con el código de estado apropiado (200, 201, 404, etc.) y los datos en formato JSON.

Capa de Middlewares (/src/middlewares/)

auth.middleware.js: El Guardia de Seguridad de la API. Es una función que se ejecuta antes que el controlador en las rutas protegidas. Su trabajo es verificar la validez del token JWT que viene en la cabecera de la petición. Si el token es válido, permite que la petición continúe hacia el controlador; si no, la detiene y devuelve un error de autenticación (401 o 403).

Capa de Servicios (/src/services/)

product.service.js y auth.service.js: Contienen la Lógica de Negocio. Esta capa es el cerebro de la aplicación. Los controladores le delegan el trabajo "real". Los servicios orquestan las operaciones, realizan validaciones de negocio (más complejas que las del controlador) y llaman a los modelos para acceder a los datos. Por ejemplo, el auth.service.js valida las credenciales y genera el token; el product.service.js se asegura de que un producto exista antes de intentar actualizarlo.

Capa de Modelos (/src/models/)

product.model.firestore.js: Capa de Acceso a Datos (DAL). Es la única capa que tiene permitido hablar directamente con la base de datos. Contiene todas las funciones CRUD (getAll, getById, create, update, delete) que ejecutan las operaciones correspondientes en la colección products de Firestore. Abstrae la complejidad de las consultas a la base de datos del resto de la aplicación.

    Método,   Ruta ,      Descripción ,    Acceso :  
*   POST   /auth/login   Autentica a un usuario y devuelve un token.   Público.  
*   GET    /api/products   Obtiene todos los productos.   Público.  
*   GET    /api/products/:id   Obtiene un producto por su ID.   Público.  
*   POST   /api/products   Crea un nuevo producto.   Protegido (Requiere Token)  .
*   PATCH  /api/products/:id   Actualiza un producto existente.   Protegido (Requiere Token).  
*   DELETE /api/products/:id   Elimina un producto.   Protegido (Requiere Token).  

Cómo Subir y Actualizar el Proyecto en GitHub

Esta sección describe brevemente los comandos para versionar el código de este proyecto usando Git y para subirlo a un repositorio remoto en GitHub.
Requisitos Previos:  Tener Git instalado en tu sistema y  una cuenta en GitHub.

Paso 1.1: Inicializar el Repositorio Local
Navegar a la carpeta raíz del proyecto en la terminal y ejecuta:

git init           //   Este comando crea un nuevo repositorio de Git en tu proyecto.

git remote add origin https://github.com/tu-usuario/tu-repositorio.git      //  Este comando establece un "control remoto" llamado origin que apunta a tu repositorio en GitHub.

git remote –v     //  Para visualizar la URL del repositorio listada para fetch y push.

git status  //  Para ver los archivos modificados

git add .   // Para agregar  todos los archivos modificados al "área de preparación" (Staging Area). El . representa todos los archivos y carpetas.

git commit -m  "Para incorporar nuevas rutas de productos" // Crea una "foto instantánea" (un commit) de los cambios más una despcripción.

git push origin main    //  Para enviar  todos los commits  desde tu computadora local al repositorio GitHub.  Si el repositorio en GitHub  tuviera cambios que no existen en el repositorio local, Git no  dejará usar git push directamente, dado que antes es necesario sincronizar.
git pull origin main –rebase. Para descargar e integrar los cambios en Github al repositorio local; el repositorio local quedará actualizado a nivel del remoto en GitHub.


En esta aplicación Fullstack se ha implementado la siguiente cadena de eventos:

  *   Frontend (Static Site en Render): Se cargó correctamente en el navegador desde la URL pública:   https://frontend-proyecto-final-ecommerce-api.onrender.com/
  *   Login: Se enviaron las  credenciales del usuario desde el frontend.
  *   Comunicación Frontend -> Backend: La petición fetch viajó por internet desde la URL del frontend hasta la URL del backend en Render: https://backend-proyecto-final-ecommerce-api.onrender.com/
  *   Recepción del Backend (Web Service en Render): La API de Node.js, corriendo en la nube, recibió la petición.
  *   Variables de Entorno: La API en Render leyó correctamente las variables de entorno que se configuraron, incluyendo las de Firebase y la JWT_SECRET_KEY.
  *   Autenticación: El servicio de autenticación validó las credenciales y generó un token JWT (con la duración establecida).
  *   Respuesta del Backend -> Frontend: El token fue enviado de vuelta al navegador.
  *   Manejo del Token: El JavaScript del navegador guardó el token en localStorage.
  *   Petición Protegida: Al crear un nuevo producto, el frontend envió una petición POST incluyendo el token en la cabecera Authorization.
  *   Middleware de Seguridad: El authMiddleware en el backend interceptó la petición, verificó que el token era válido y que no había expirado, y le dio paso a la ruta.
  *   Lógica del CRUD: El controlador, servicio y modelo hicieron su trabajo, creando un nuevo documento en la base de datos de Firestore.
  *   Actualización de la User Interfase: El frontend recibió la respuesta de éxito y actualizó la lista de productos en tiempo real.
Se ha construido y desplegado una aplicación Full-Stack completa. 


Resumen del Frontend: Gestor de Productos:
Este frontend es una Aplicación de Una Sola Página (Single Page Application - SPA) desarrollada con HTML, CSS y JavaScript puro (Vanilla JS). Su propósito es consumir la API RESTful del backend para proporcionar una interfaz gráfica de usuario (GUI) que permita a los usuarios visualizar, crear, editar y eliminar productos de la tienda, así como gestionar su sesión mediante un sistema de autenticación.

Estructura de Archivos del Frontend
El código del frontend reside en la carpeta public y está organizado de la siguiente manera:

public/
¦
+-- index.html            # La estructura principal y el esqueleto de la aplicación.
+-- styles.css            # Hoja de estilos para la apariencia visual y el diseño.
+-- js/                   # Carpeta que contiene toda la lógica de la aplicación.
    ¦
    +-- api.js            # Módulo de comunicación: maneja todas las peticiones a la API del backend.
    +-- ui.js             # Módulo de interfaz: controla la manipulación del DOM (lo que el usuario ve).
    +-- main.js           # Módulo principal: orquesta la aplicación, maneja el estado y los eventos.


index.html
 Es la base de toda la aplicación. Contiene la estructura semántica de todos los elementos visuales, como el encabezado, el área de visualización de productos, los formularios y el modal para la creación/edición.
Importancia: Define todos los id y class que los archivos JavaScript utilizan para seleccionar y manipular elementos del DOM. También es responsable de cargar la hoja de estilos (styles.css) y el punto de entrada de JavaScript (main.js), utilizando el atributo type="module" para habilitar la sintaxis de módulos de ES6 (import/export).

styles.css
 Proporciona la capa de presentación visual de la aplicación. Define los colores, fuentes, espaciados, diseño de la cuadrícula de productos y la apariencia del modal.
Importancia: Separa completamente el estilo de la estructura (HTML) y la lógica (JS), siguiendo las mejores prácticas del desarrollo web. Hace que la aplicación sea intuitiva y agradable a la vista.

Carpeta /js
Esta carpeta contiene el cerebro de la aplicación, dividido en tres módulos especializados:

js/api.js - La Capa de Datos (Comunicador)
Responsabilidad: Contiene todas las funciones async/await que realizan peticiones fetch al backend. Cada función (ej: getProducts, login, createProduct) se corresponde con un endpoint de la API.
Importancia: Centraliza toda la lógica de comunicación con el servidor en un solo lugar. Si la URL del backend cambia, solo necesita ser modificada en este archivo. También maneja la inclusión del token de autorización en las cabeceras de las peticiones protegidas.

js/ui.js - La Capa de Vista (Manipulador del DOM)
Responsabilidad: Contiene funciones dedicadas a manipular directamente la interfaz de usuario. Por ejemplo, renderProducts() crea las tarjetas de los productos y las inserta en el HTML, updateAuthUI() muestra u oculta elementos dependiendo del estado de autenticación del usuario, y showModal()/hideModal() controlan la visibilidad del formulario emergente.
Importancia: Abstrae la manipulación del DOM del resto de la lógica. Si se decide cambiar cómo se muestra la lista de productos (por ejemplo, de una cuadrícula a una lista), solo habría que modificar la función renderProducts() en este archivo.

js/main.js - El Orquestador (Controlador Principal)
Responsabilidad: Es el punto de entrada y el director de orquesta del frontend.
Maneja el Estado: Mantiene variables clave como la lista actual de productos y el token de autenticación.
Asigna Eventos: Utiliza addEventListener para "escuchar" las acciones del usuario (clics en botones, envíos de formularios) y asociarlas con las funciones correspondientes (ej: handleLogin, handleProductFormSubmit).
Coordina los Módulos: Cuando ocurre un evento, main.js llama a las funciones apropiadas de api.js para obtener o enviar datos y, una vez que tiene una respuesta, llama a las funciones de ui.js para actualizar la pantalla.
Importancia: Conecta todas las piezas y define el flujo lógico de la aplicación desde la perspectiva del usuario. Gestiona el ciclo de vida de la aplicación, desde la carga inicial de datos hasta la interacción del usuario.

¡Un gran paso para Vincenzo! (aunque no lo sea para la humanidad).

Autor:   Vincenzo Natale,  vnatale52@gmail.com,   Curso:  Back-End / Node JS, TT Adultos - 1C 2025
