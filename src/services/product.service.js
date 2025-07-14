// src/services/product.service.js

// --- 1. IMPORTACIONES ---
// Importamos el modelo de productos de Firestore.
// Toda la interacción con la base de datos se delega a este objeto. Reemplazamos ../ por #
import productModel from '#models/product.model.firestore.js';

// --- 2. FUNCIONES DEL SERVICIO ---

/**
 * Servicio para obtener todos los productos.
 * Llama directamente al método correspondiente del modelo.
 * @returns {Promise<Array>} Un array con todos los productos.
 */
async function getAllProducts() {
  console.log('Servicio: Obteniendo todos los productos.');
  // La lógica de negocio aquí es simple: solo pasamos la solicitud al modelo.
  const products = await productModel.getAll();
  return products;
}

/**
 * Servicio para obtener un producto específico por su ID.
 * @param {string} id - El ID del producto a buscar.
 * @returns {Promise<object|null>} El objeto del producto si se encuentra, de lo contrario null.
 */
async function getProductById(id) {
  console.log(`Servicio: Obteniendo producto con ID: ${id}`);
  // Llama al modelo para obtener el producto por su ID.
  return await productModel.getById(id);
}

/**
 * Servicio para crear un nuevo producto.
 * @param {object} productData - Los datos del producto a crear.
 * @returns {Promise<object>} El objeto del producto completo recién creado.
 */
async function createProduct(productData) {
  console.log('Servicio: Creando nuevo producto.');
  // Llama al modelo para que inserte los datos en la base de datos.
  // El modelo nos devuelve el ID del nuevo producto.
  const newProductId = await productModel.create(productData);
  
  // Lógica de negocio: Componemos el objeto completo del producto recién creado para devolverlo al controlador.
  // Esto evita tener que hacer otra consulta a la base de datos.
  return { id: newProductId, ...productData };
}

/**
 * Servicio para actualizar un producto existente.
 * @param {string} id - El ID del producto a actualizar.
 * @param {object} productData - Un objeto con los campos y los nuevos valores.
 * @returns {Promise<object|null>} El objeto del producto actualizado, o null si el producto no se encontró.
 */
async function updateProduct(id, productData) {
  console.log(`Servicio: Actualizando producto con ID: ${id}`);
  
  // Lógica de negocio: Antes de intentar actualizar, verificamos que el producto realmente existe.
  // Esto evita realizar una operación de escritura innecesaria si el ID es inválido.
  const productExists = await productModel.getById(id);
  if (!productExists) {
    // Si no existe, devolvemos null. El controlador interpretará esto como un "No Encontrado" (404).
    return null; 
  }

  // Si el producto existe, le pedimos al modelo que lo actualice.
  await productModel.update(id, productData);
  
  // Devolvemos el objeto del producto con los datos ya actualizados.
  // Usamos el spread operator para fusionar los datos originales con los nuevos.
  return { ...productExists, ...productData };
}

/**
 * Servicio para eliminar un producto.
 * @param {string} id - El ID del producto a eliminar.
 * @returns {Promise<boolean>} Devuelve `true` si el producto fue encontrado y eliminado, `false` si no se encontró.
 */
async function deleteProduct(id) {
  console.log(`Servicio: Intentando eliminar producto con ID: ${id}`);

  // Lógica de negocio: Verificamos que el producto existe antes de intentar eliminarlo.
  const productExists = await productModel.getById(id);
  if (!productExists) {
    // Si no existe, no se puede eliminar. Devolvemos `false`.
    return false;
  }

  // Si el producto existe, llamamos al modelo para que lo elimine.
  await productModel.delete(id);
  
  // Devolvemos `true` para indicar que la operación fue exitosa.
  return true;
}


// --- 3. EXPORTACIÓN ---
// Exportamos un objeto que contiene todas las funciones del servicio,
// haciéndolas disponibles para la capa de Controladores.
export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};