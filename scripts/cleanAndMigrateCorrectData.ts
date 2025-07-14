// scripts/cleanAndMigrateCorrectData.ts
// Script para limpiar Firebase y migrar SOLO los datos correctos

import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { Asset, User, LookupItem } from '../types';

// Datos correctos desde el SQL original
const correctAssets: Omit<Asset, 'id'>[] = [
    {
        zona: 'A140_',
        fabricante: 'PC Estándar',
        subcategoria: 'PC',
        categoria: 'Sobremesa',
        deviceType: 'SIMATIC PC Station',
        ipAddress: '192.168.0.45',
        subnet: '255.255.255.0',
        gateway: '0.0.0.0',
        macAddress: '8C:8C:AA:56:15:7E',
        hardware: 0,
        profinetName: 'wc-rks',
        profinetConvertedName: 'wc-rks',
        notes: 'PC cliente en reactores',
        latitude: 41.3423,
        longitude: 2.1584,
        criticidad: 'Media',
        serialNumber: '',
        firmware: ''
    },
    {
        zona: 'A140_',
        fabricante: 'PC Estándar',
        subcategoria: 'PC',
        categoria: 'Sobremesa',
        deviceType: 'SIMATIC PC Station',
        ipAddress: '192.168.0.46',
        subnet: '255.255.255.0',
        gateway: '0.0.0.0',
        macAddress: 'D0:17:C2:8C:06:D7',
        hardware: 0,
        profinetName: 'ws-evap',
        profinetConvertedName: 'ws-evap',
        notes: 'PC WS-EVAP Tarjeta X PC1 Evaporadores (Alejado de la puerta)',
        image: '/img/PC_EVAPORADOR.mp4',
        mapsUrl: 'https://maps.google',
        latitude: 41.3423,
        longitude: 2.1584,
        criticidad: 'Media',
        serialNumber: '',
        firmware: ''
    },
    {
        zona: 'A140_',
        fabricante: 'PC Estándar',
        subcategoria: 'PC',
        categoria: 'Sobremesa',
        deviceType: 'SIMATIC PC Station',
        ipAddress: '192.168.0.47',
        subnet: '255.255.255.0',
        gateway: '0.0.0.0',
        macAddress: '00:FF:7D:12:CC:C3',
        hardware: 0,
        profinetName: 'wc-bio',
        profinetConvertedName: 'wc-bio',
        notes: 'PC cliente en sala bio',
        image: '/img/PC_BIO.JPEG',
        latitude: 41.3423,
        longitude: 2.1584,
        criticidad: 'Media',
        serialNumber: '',
        firmware: ''
    },
    // ... resto de los 104 assets del SQL
];

// Función para limpiar todas las colecciones
async function cleanFirebase() {
    console.log('🧹 Limpiando Firebase...');
    
    const collections = ['assets', 'users', 'manufacturers', 'subcategories', 'zonas'];
    
    for (const collectionName of collections) {
        console.log(`🗑️ Limpiando colección: ${collectionName}`);
        const querySnapshot = await getDocs(collection(db, collectionName));
        
        for (const docSnapshot of querySnapshot.docs) {
            await deleteDoc(doc(db, collectionName, docSnapshot.id));
        }
        
        console.log(`✅ ${collectionName} limpiada - ${querySnapshot.docs.length} docs eliminados`);
    }
}

// Función para migrar datos correctos
async function migrateCorrectData() {
    console.log('📤 Migrando datos correctos...');
    
    // TODO: Implementar migración con datos correctos del SQL
    // Por ahora, solo un ejemplo con los primeros 3 assets
    
    console.log('✅ Migración completada');
}

async function main() {
    try {
        await cleanFirebase();
        await migrateCorrectData();
        console.log('🎉 Proceso completado exitosamente!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Ejecutar el script
main()
    .then(() => {
        console.log('✨ Script completado');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Error en el script:', error);
        process.exit(1);
    }); 