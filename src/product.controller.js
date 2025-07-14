// src/controllers/product.controller.js . reemplazadi  ../  por  #
import productService from '#services/product.service.js';

async function getAllProducts(req, res) {
  try {
    // Llama al servicio para obtener los datos
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
}

export default {
  getAllProducts,
  // getProductById, createProduct, etc.
};