// src/controllers/product.controller.js

// 1. IMPORTACIONES - reemplazamos ../   por  #
import productService from '#services/product.service.js';

// 2. FUNCIONES DEL CONTROLADOR

// TODAS estas funciones están definidas antes de exportarlas.

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}


async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

async function createProduct(req, res) {
  try {
    const productData = req.body;
    if (!productData.name || !productData.price) {
      return res.status(400).json({ message: 'El nombre y el precio son requeridos.' });
    }
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const productData = req.body;
    if (Object.keys(productData).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron datos para actualizar.' });
    }
    const updatedProduct = await productService.updateProduct(id, productData);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const wasDeleted = await productService.deleteProduct(id);
    if (wasDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

// 3. EXPORTACIÓN
export default {
  getAllProducts,
  getProductById, 
  createProduct,
  updateProduct,
  deleteProduct,
};