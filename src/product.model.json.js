// src/models/product.model.json.js

import fs from 'fs/promises';
import path from 'path';

const productsPath = path.resolve('#src/data/products.json');    // no tenía ./  colocado #

// Función para leer los productos desde el archivo JSON
async function readProducts() {
  try {
    const data = await fs.readFile(productsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe o hay un error, devolvemos un array vacío
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Exportamos las funciones que interactúan con los datos
export default {
  getAll: readProducts,
  // Aquí se añadirían getById, create, delete, etc.
};
