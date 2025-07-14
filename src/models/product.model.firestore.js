// src/models/product.model.firestore.js

// --- 1. IMPORTACIONES ---
// Importamos la instancia 'db' de nuestra configuración de Firebase.
// 'db' es el objeto que nos da acceso a toda la base de datos de Firestore.
import { db } from '#config/firebase.config.js'; // reemplazo ../  por #

// Importamos las funciones específicas de Firestore que vamos a necesitar para el CRUD.
import { 
  collection, // Para obtener una referencia a una colección.
  getDocs,    // Para obtener todos los documentos de una colección.
  doc,        // Para obtener una referencia a un documento específico por su ID.
  getDoc,     // Para obtener los datos de un único documento.
  addDoc,     // Para agregar un nuevo documento a una colección con un ID autogenerado.
  updateDoc,  // Para actualizar un documento existente.
  deleteDoc   // Para eliminar un documento.
} from 'firebase/firestore';

// --- 2. REFERENCIA A LA COLECCIÓN ---
// Creamos una referencia a la colección 'products' en Firestore.
// Almacenamos esto en una constante para reutilizarla y evitar errores de tipeo.
const productsCollection = collection(db, 'products');


// --- 3. FUNCIONES DEL MODELO (CRUD) ---

/**
 * Modelo para obtener todos los productos de la colección 'products'.
 * @returns {Promise<Array>} Un array de objetos, donde cada objeto es un producto.
 */
async function getAll() {
  // 'getDocs' obtiene una "instantánea" (snapshot) de la colección en un momento dado.
  const snapshot = await getDocs(productsCollection);
  
  // La instantánea contiene los documentos en su propiedad 'docs'.
  // Mapeamos cada documento para crear un nuevo array de productos con un formato más útil.
  // Para cada 'doc', extraemos sus datos con doc.data() y muy importante, agregamos el 'id' del documento.
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return products;
}

/**
 * Modelo para obtener un único producto por su ID.
 * @param {string} id - El ID único del documento a obtener.
 * @returns {Promise<object|null>} El objeto del producto si se encuentra, o null si no existe.
 */
async function getById(id) {
  // Creamos una referencia directa al documento específico dentro de la colección 'products' usando su ID.
  const docRef = doc(db, 'products', id);
  // 'getDoc' obtiene el snapshot del documento individual.
  const docSnap = await getDoc(docRef);

  // Verificamos si el documento realmente existe en la base de datos.
  if (docSnap.exists()) {
    // Si existe, devolvemos el objeto del producto, incluyendo su ID.
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    // Si no se encuentra un documento con ese ID, devolvemos null.
    return null;
  }
}

/**
 * Modelo para crear (agregar) un nuevo producto en la colección.
 * @param {object} productData - Un objeto con los datos del nuevo producto (nombre, precio, etc.).
 * @returns {Promise<string>} El ID del nuevo producto que Firestore ha generado automáticamente.
 */
async function create(productData) {
  // 'addDoc' agrega un nuevo documento a la colección especificada.
  // Firestore genera automáticamente un ID único para este nuevo documento.
  const docRef = await addDoc(productsCollection, productData);
  // Devolvemos el ID de este nuevo documento para referencia futura.
  return docRef.id;
}

/**
 * Modelo para actualizar un producto existente por su ID.
 * @param {string} id - El ID del documento a actualizar.
 * @param {object} productData - Un objeto con los campos y nuevos valores a actualizar.
 * @returns {Promise<void>} No devuelve nada, solo completa la operación.
 */
async function update(id, productData) {
  // Creamos una referencia al documento que queremos actualizar.
  const docRef = doc(db, 'products', id);
  // 'updateDoc' actualiza los campos especificados en el objeto 'productData'.
  // Es importante destacar que solo modifica los campos presentes en el objeto,
  // no borra los campos que no se incluyen (comportamiento de 'merge').
  await updateDoc(docRef, productData);
}

/**
 * Modelo para eliminar un producto de la colección por su ID.
 * @param {string} id - El ID del documento a eliminar.
 * @returns {Promise<void>} No devuelve nada, solo completa la operación.
 */
async function deleteById(id) {
  // Creamos una referencia al documento que queremos eliminar.
  const docRef = doc(db, 'products', id);
  // 'deleteDoc' elimina permanentemente el documento de la base de datos.
  await deleteDoc(docRef);
}


// --- 4. EXPORTACIÓN ---
// Exportamos un objeto que contiene todos los métodos del modelo.
// Esto permite que la capa de servicio los importe y los use de forma organizada.
// Ej: import productModel from '...'; productModel.getAll();
export default {
  getAll,
  getById,
  create,
  update,
  // Usamos 'delete' como nombre de la propiedad y le asignamos la función 'deleteById'.
  // Hacemos esto porque 'delete' es una palabra reservada en JavaScript.
  delete: deleteById,
};