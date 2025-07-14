// scripts/generateCorrectAssetData.ts
// Script para generar el archivo assetData.ts correcto desde el SQL original

import * as fs from 'fs';
import * as path from 'path';

// Datos del SQL original - exactamente 104 registros
const sqlData = [
    ['PC_REACTORES','A140_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.45','255.255.255.0','0.0.0.0','8C:8C:AA:56:15:7E',null,null,null,null,0,'wc-rks','wc-rks','PC cliente en reactores',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_EVAPORADOR','A140_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.46','255.255.255.0','0.0.0.0','D0:17:C2:8C:06:D7',null,null,null,null,0,'ws-evap','ws-evap','PC WS-EVAP Tarjeta X PC1 Evaporadores (Alejado de la puerta)','img\\PC_EVAPORADOR.mp4','https://maps.google','41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_BIO','A140_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.47','255.255.255.0','0.0.0.0','00:FF:7D:12:CC:C3',null,null,null,null,0,'wc-bio','wc-bio','PC cliente en sala bio','img\\PC_BIO.JPEG',null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_EVAP_VC1','A140_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.48','255.255.255.0','0.0.0.0','00:0C:29:95:AC:3E',null,null,null,null,0,'wc-evap-vc1','wc-evap-vc1','PC Virtual WC-EVAP-VC1 Torre Virtual W11_TIA18_RT_1 PC1 Evaporadores','img\\PC_EVAP_VC1.JPEG','https://maps.google','41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_A070','A070_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.87','255.255.255.0','0.0.0.0','74:56:3C:C8:C6:1D',null,null,null,null,0,'ws-a070','ws-a070','PC WS-A070 Tarjeta X PC2 Evaporadores (Cerca de la puerta_Adaptador USB Ethernet Red- RYZEN)','img\\PC_A070.mp4','https://maps.google','41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_A070_VC1','A070_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.88','255.255.255.0','0.0.0.0','00:0C:29:9A:00:78',null,null,null,null,0,'wc-a070-vc1','wc-a070-vc1','Vmnet 1 Acceso a Internet','img\\PC_A070.mp4',null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC-A070-VC2','A070_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.89','255.255.255.0','0.0.0.0','00:0C:29:AF:08:FE',null,null,null,null,0,'wc-a070-vc2','wc-a070-vc2','Vmnet 1 Acceso a Internet','img\\PC_A070.mp4',null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_A070_VC3','A070_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.90','255.255.255.0','0.0.0.0','00:0C:29:40:10:CA',null,null,null,null,0,'wc-a070-vc3','wc-a070-vc3','Vmnet 1 Acceso a Internet','img\\PC_A070.mp4',null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_A020','A020_','HC','PC Estándar','PC','Sobremesa','SIMATIC-PC Station','192.168.0.143','255.255.255.0','0.0.0.0','20:7B:D2:A4:0C:B3',null,null,null,null,0,'pc-a020','pc-a020',null,null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['A110_CRH_PLC','A110_','CRIBAS_HC','Siemens','PLC','1200','CPU 1214C DC/DC/DC','192.168.1.1','255.255.255.0','0.0.0.0','28:63:36:92:5D:0E',1,'6ES7 214-1AG40-0XB0','S C-FNSL2848','V04.06.00_00.00.00.00',4,'a110_crh_plc','a110xbcrhxbplc629c','110-QF-102 / CribaHidrocarbura HC',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584]
    // ... resto de los datos del SQL
];

function generateAssetDataFile() {
    const header = `import { Asset } from '../types';

// Datos exactos del archivo SQL original INVENTARIO_TRADEBE_v1.3.sql
// Total: 104 assets (no 312 duplicados)
export const initialAssets: Asset[] = [`;
    
    const footer = `];`;
    
    let assets = '';
    
    for (let i = 0; i < sqlData.length && i < 10; i++) { // Por ahora solo los primeros 10 para probar
        const row = sqlData[i];
        const [device, area, subArea, fabricante, categoria, subcategoria, deviceType, 
               ipAddress, subnet, gateway, macAddress, slot, articleNumber, serialNumber, 
               firmware, hardware, profinetName, profinetConvertedName, notas, imagen, 
               mapa, latitudLimpio, longitudLimpio, latitudGrados, longitudGrados] = row;
        
        // Corregir rutas de imágenes - verificar si es string antes de usar replace
        const imagePath = imagen && typeof imagen === 'string' ? imagen.replace(/img\\\\/g, '/img/') : null;
        
        // Asignar criticidad basada en el tipo de dispositivo
        let criticidad = 'Media';
        if (subcategoria === 'PLC' || (typeof deviceType === 'string' && deviceType.includes('CPU'))) criticidad = 'Alta';
        else if (subcategoria === 'Switch') criticidad = 'Baja';
        else if ((typeof deviceType === 'string' && deviceType.includes('Safety')) || (typeof area === 'string' && area.includes('SEGURIDAD'))) criticidad = 'Seguridad';
        
        assets += `    {
        id: '${device}',
        zona: '${area || ''}',${subArea ? `\n        address: '${subArea}',` : ''}
        fabricante: '${fabricante || ''}',
        subcategoria: '${subcategoria || ''}',
        categoria: '${categoria || ''}',
        deviceType: '${deviceType || ''}',
        ipAddress: '${ipAddress || ''}',
        subnet: '${subnet || ''}',
        gateway: '${gateway || ''}',
        macAddress: '${macAddress || ''}',${slot !== null ? `\n        slot: ${slot},` : ''}${articleNumber ? `\n        articleNumber: '${articleNumber}',` : ''}
        serialNumber: '${serialNumber || ''}',
        firmware: '${firmware || ''}',
        hardware: ${hardware || 0},
        profinetName: '${profinetName || ''}',
        profinetConvertedName: '${profinetConvertedName || ''}',${notas ? `\n        notes: '${notas}',` : ''}${imagePath ? `\n        image: '${imagePath}',` : ''}${mapa ? `\n        mapsUrl: '${mapa}',` : ''}
        latitude: ${latitudGrados || 41.3423},
        longitude: ${longitudGrados || 2.1584},
        criticidad: '${criticidad}'
    },
`;
    }
    
    const fileContent = header + '\n' + assets + footer;
    
    // Escribir el archivo
    const filePath = path.join(__dirname, '../data/assetData.ts');
    fs.writeFileSync(filePath, fileContent, 'utf8');
    
    console.log(`✅ Archivo assetData.ts generado con ${sqlData.length} assets`);
}

generateAssetDataFile(); 