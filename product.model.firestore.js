// src/models/product.model.firestore.js

import { db } from '#config/firebase.config.js';     //   cambiado   ../   por   #
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Referencia a la colección 'products' en Firestore.
const productsCollection = collection(db, 'products');

/**
 * Obtiene todos los productos de la colección.
 * @returns {Promise<Array>} Un array con todos los productos.
 */
async function getAll() {
  const snapshot = await getDocs(productsCollection);
  // Mapeamos los documentos para incluir el ID generado por Firestore.
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
}

// Aquí agregaremos las otras funciones (getById, create, etc.) más adelante.

export default {
  getAll,
  // getById,
  // create,
  // update,
  // delete: deleteById
};