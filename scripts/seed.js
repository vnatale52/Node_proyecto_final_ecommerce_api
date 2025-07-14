// scripts/seed.js     
// Para copiar o "sembrar" automáticamente  los datos de los registros de los productos desde un archivo de texto JSON directamente a documentos de una colección de Firebase

import fs from 'fs/promises'; // Módulo para leer archivos (File System)
import path from 'path'; // Módulo para trabajar con rutas de archivos
import { fileURLToPath } from 'url'; // Para obtener la ruta del directorio actual
import dotenv from 'dotenv'; // Para cargar las variables de entorno

// Importamos la configuración de Firebase y las funciones de Firestore
import { db } from '../src/config/firebase.config.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// --- Configuración Inicial ---

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtenemos la ruta del directorio del script actual. Es necesario para leer el JSON correctamente.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Función Principal del Script ---

/**
 * Función para leer los productos del archivo JSON y guardarlos en Firestore.
 */
async function seedDatabase() {
  try {
    console.log('🌱 Iniciando el sembrado de la base de datos...');

    // 1. Referencia a la colección 'products' en Firestore
    const productsCollection = collection(db, 'products');

    // **Mejora Opcional pero Recomendada:** Verificar si la colección ya tiene datos
    const snapshot = await getDocs(productsCollection);
    if (!snapshot.empty) {
      console.log('⚠️ La colección "products" ya contiene datos. No se agregarán nuevos documentos.');
      return; // Detiene el script si ya hay productos
    }

    // 2. Leer el archivo products.json
    // Usamos path.resolve para construir una ruta absoluta al archivo JSON
    const productsPath = path.resolve(__dirname, '../src/data/products.json');
    const productsData = await fs.readFile(productsPath, 'utf8');
    const products = JSON.parse(productsData); // Convertir el texto JSON a un array de objetos

    // 3. Iterar sobre cada producto y agregarlo a Firestore
    console.log('📝 Agregando productos a Firestore...');
    for (const product of products) {
      // No es necesario pasar el 'id' del JSON, Firestore generará uno automáticamente.
      // Creamos un nuevo objeto sin el id.
      const { id, ...productData } = product; 
      
      await addDoc(productsCollection, productData);
      console.log(`✅ Producto "${product.name}" agregado.`);
    }

    console.log('✨ Sembrado de la base de datos completado exitosamente.');

  } catch (error) {
    console.error('❌ Error durante el sembrado de la base de datos:', error);
  }
}

// --- Ejecutar el Script ---
seedDatabase();