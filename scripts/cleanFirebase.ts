// scripts/cleanFirebase.ts
// Script para limpiar todas las colecciones de Firebase

import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

async function cleanFirebase() {
    console.log('🧹 Iniciando limpieza de Firebase...');
    
    const collections = ['assets', 'users', 'manufacturers', 'subcategories', 'zonas'];
    let totalDeleted = 0;
    
    for (const collectionName of collections) {
        console.log(`🗑️ Limpiando colección: ${collectionName}`);
        const querySnapshot = await getDocs(collection(db, collectionName));
        
        for (const docSnapshot of querySnapshot.docs) {
            await deleteDoc(doc(db, collectionName, docSnapshot.id));
        }
        
        console.log(`✅ ${collectionName} limpiada - ${querySnapshot.docs.length} docs eliminados`);
        totalDeleted += querySnapshot.docs.length;
    }
    
    console.log(`🎉 Limpieza completada! Total eliminados: ${totalDeleted} documentos`);
}

// Ejecutar la limpieza
cleanFirebase()
    .then(() => {
        console.log('✨ Script de limpieza completado');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Error en la limpieza:', error);
        process.exit(1);
    }); 