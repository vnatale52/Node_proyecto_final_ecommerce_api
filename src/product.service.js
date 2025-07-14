// src/services/product.service.js
import productModel from '#models/product.model.json.js'; // Empezamos con el modelo JSON , reemplazado  ../  por #

async function getAllProducts() {
  // Llama al modelo para obtener todos los productos
  const products = await productModel.getAll();
  return products;
}

export default {
  getAllProducts,
};