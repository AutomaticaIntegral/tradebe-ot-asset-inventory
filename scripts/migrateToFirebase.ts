// scripts/migrateToFirebase.ts
// Script para migrar datos iniciales a Firebase
// SOLO EJECUTAR UNA VEZ para poblar la base de datos

import { initializeData } from '../services/firebaseService';
import { initialAssets } from '../data/assetData';
import { initialManufacturers, initialSubcategories, initialZonas } from '../data/lookupData';
import { users as initialUsers } from '../data/userData';

async function migrateData() {
  console.log('🚀 Iniciando migración de datos a Firebase...');
  
  try {
    // Migrar usuarios
    console.log('📤 Migrando usuarios...');
    await initializeData.addInitialUsers(initialUsers);
    console.log('✅ Usuarios migrados exitosamente');
    
    // Migrar datos de lookup
    console.log('📤 Migrando datos de lookup...');
    await initializeData.addInitialLookupData(
      initialManufacturers,
      initialSubcategories,
      initialZonas
    );
    console.log('✅ Datos de lookup migrados exitosamente');
    
    // Migrar assets (en lotes pequeños para evitar timeouts)
    console.log('📤 Migrando assets...');
    const batchSize = 10;
    const totalAssets = initialAssets.length;
    
    for (let i = 0; i < totalAssets; i += batchSize) {
      const batch = initialAssets.slice(i, i + batchSize);
      await initializeData.addInitialAssets(batch);
      console.log(`✅ Migrados ${Math.min(i + batchSize, totalAssets)}/${totalAssets} assets`);
    }
    
    console.log('🎉 ¡Migración completada exitosamente!');
    console.log(`📊 Resumen:
    - ${initialUsers.length} usuarios
    - ${initialManufacturers.length} fabricantes
    - ${initialSubcategories.length} subcategorías
    - ${initialZonas.length} zonas
    - ${initialAssets.length} assets`);
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  }
}

// Ejecutar la migración
migrateData()
  .then(() => {
    console.log('✨ Script de migración completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error en el script de migración:', error);
    process.exit(1);
  }); 