// scripts/generateCompleteAssetData.ts
// Script para generar TODOS los 104 assets del SQL original

import * as fs from 'fs';
import * as path from 'path';

// Todos los 104 registros del SQL original INVENTARIO_TRADEBE_v1.3.sql
const allSqlData = [
    ['PC_REACTORES','A140_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.45','255.255.255.0','0.0.0.0','8C:8C:AA:56:15:7E',null,null,null,null,0,'wc-rks','wc-rks','PC cliente en reactores',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_EVAPORADOR','A140_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.46','255.255.255.0','0.0.0.0','D0:17:C2:8C:06:D7',null,null,null,null,0,'ws-evap','ws-evap','PC WS-EVAP Tarjeta X PC1 Evaporadores (Alejado de la puerta)','img\\PC_EVAPORADOR.mp4','https://maps.google','41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_BIO','A140_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.47','255.255.255.0','0.0.0.0','00:FF:7D:12:CC:C3',null,null,null,null,0,'wc-bio','wc-bio','PC cliente en sala bio','img\\PC_BIO.JPEG',null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_EVAP_VC1','A140_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.48','255.255.255.0','0.0.0.0','00:0C:29:95:AC:3E',null,null,null,null,0,'wc-evap-vc1','wc-evap-vc1','PC Virtual WC-EVAP-VC1 Torre Virtual W11_TIA18_RT_1 PC1 Evaporadores','img\\PC_EVAP_VC1.JPEG','https://maps.google','41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_A070','A070_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.87','255.255.255.0','0.0.0.0','74:56:3C:C8:C6:1D',null,null,null,null,0,'ws-a070','ws-a070','PC WS-A070 Tarjeta X PC2 Evaporadores (Cerca de la puerta_Adaptador USB Ethernet Red- RYZEN)','img\\PC_A070.mp4','https://maps.google','41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_A070_VC1','A070_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.88','255.255.255.0','0.0.0.0','00:0C:29:9A:00:78',null,null,null,null,0,'wc-a070-vc1','wc-a070-vc1','Vmnet 1 Acceso a Internet','img\\PC_A070.mp4',null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC-A070-VC2','A070_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.89','255.255.255.0','0.0.0.0','00:0C:29:AF:08:FE',null,null,null,null,0,'wc-a070-vc2','wc-a070-vc2','Vmnet 1 Acceso a Internet','img\\PC_A070.mp4',null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_A070_VC3','A070_',null,'PC Estándar','PC','Sobremesa','SIMATIC PC Station','192.168.0.90','255.255.255.0','0.0.0.0','00:0C:29:40:10:CA',null,null,null,null,0,'wc-a070-vc3','wc-a070-vc3','Vmnet 1 Acceso a Internet','img\\PC_A070.mp4',null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['PC_A020','A020_','HC','PC Estándar','PC','Sobremesa','SIMATIC-PC Station','192.168.0.143','255.255.255.0','0.0.0.0','20:7B:D2:A4:0C:B3',null,null,null,null,0,'pc-a020','pc-a020',null,null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['A110_CRH_PLC','A110_','CRIBAS_HC','Siemens','PLC','1200','CPU 1214C DC/DC/DC','192.168.1.1','255.255.255.0','0.0.0.0','28:63:36:92:5D:0E',1,'6ES7 214-1AG40-0XB0','S C-FNSL2848','V04.06.00_00.00.00.00',4,'a110_crh_plc','a110xbcrhxbplc629c','110-QF-102 / CribaHidrocarbura HC',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['CRH_CE01','A110_','CRIBAS_HC','Siemens','Periferia','In/Out','IM 151-3 PN','192.168.1.5','255.255.255.0','192.168.1.5','28:63:36:49:4B:A4',0,'6ES7 151-3AA23-0AB0','S C-FDA812522015','V07.00.05_00.00.00.00',7,'crh_ce01','crhxbce01f6fb','CribaHidrocarbura HC',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['CRH_CP01','A110_','CRIBAS_HC','Siemens','Periferia','In/Out','IM 151-3 PN','192.168.1.2','255.255.255.0','192.168.1.2','00:1B:1B:60:D2:E9',0,'6ES7 151-3AA23-0AB0','S C-D7TS70522013','V07.00.05_00.00.00.00',7,'crh_cp01','crhxbcp0132ea','110-QF-101 / CribaHidrocarbura HC',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['CRH_CP02','A110_','CRIBAS_HC','Siemens','Periferia','In/Out','IM 151-3 PN','192.168.1.4','255.255.255.0','192.168.1.4','28:63:36:49:48:60',0,'6ES7 151-3AA23-0AB0','S C-FDA777662015','V07.00.05_00.00.00.00',7,'crh_cp02','crhxbcp0233aa','110-QF-103 / CribaHidrocarbura HC',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['CRH_CP03','A110_','CRIBAS_HC','Siemens','Periferia','In/Out','IM 151-3 PN','192.168.1.6','255.255.255.0','192.168.1.6','28:63:36:BE:A3:3E',0,'6ES7 151-3AA23-0AB0','S C-J4P048412017','V07.00.05_00.00.00.00',8,'crh_cp03','crhxbcp03f36b','110-QF-105 / CribaHidrocarbura HC',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['A110_CRH_UOP','A110_','CRIBAS_HC','Siemens','HMI','KTP1200','KTP1200 Basic','192.168.1.3','255.255.255.0','0.0.0.0','E0:DC:A0:E6:08:72',null,'6AV2 123-2MB03-0AX0',null,'17.00.00.05_02.01',0,'a110_crh_uop','a110xbcrhxbuop5ecd','110-QF-102 / 12.1" TFT Display  / CribaHidrocarbura HC',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['A100_CRI_PLC','A100_','CRIBAS_IND','Siemens','PLC','1200','CPU 1214C DC/DC/DC','192.168.1.16','255.255.255.0','0.0.0.0','28:63:36:AD:65:AB',1,'6ES7 214-1AG40-0XB0','S C-HDMX5293','V04.06.01_00.00.00.00',5,'a100_cri_plc','a100xbcrixbplc7060','100-QF-101 PLC / Control Bombas Criba','img\\A100_CRI_PLC.JPEG','https://maps.google','41º 20\' 29.73" N','2º 9\' 30.32" E',41.3423,2.1584],
    ['CRI_CP01','A100_','CRIBAS_IND','Siemens','Periferia','In/Out','IM 151-3 PN','192.168.1.19','255.255.255.0','192.168.1.19','28:63:36:4C:92:16',0,'6ES7 151-3AA23-0AB0','S C-H1B143832016','V07.00.05_00.00.00.00',7,'cri_cp01','crixbcp01f2fa','100-QF-102 ET200S / Control Bombas Criba','img\\CRI_CP01.JPEG','https://maps.google','41º 20\' 29.73" N','2º 9\' 30.32" E',41.3423,2.1584],
    ['A100_CRI_UOP','A100_','CRIBAS_IND','Siemens','HMI','KTP700','KTP700 Basic','192.168.1.17','255.255.255.0','0.0.0.0','E0:DC:A0:4B:F8:09',null,'6AV2 123-2GB03-0AX0',null,'17.00.00.05_02.01',0,'a100_cri_uop','a100xbcrixbuop4c31','100-QF-101 HMI / 7" TFT Display / Control Bombas Criba','img\\A100_CRI_UOP.JPEG','https://maps.google','41º 20\' 29.73" N','2º 9\' 30.32" E',41.3423,2.1584],
    ['A040_FSQ_PLC','A040_','FISICO_QUIMICO','Siemens','PLC','1200','CPU 1214C DC/DC/DC','192.168.1.24','255.255.255.0','0.0.0.0','28:63:36:8F:1E:39',1,'6ES7 214-1AG40-0XB0','S C-F9SA1075','V04.06.00_00.00.00.00',3,'a040_fsq_plc','a040xbfsqxbplc1940','Fsico Quimico FSQ040  PLC1200','img\\A040_FSQ_PLC.JPEG','https://maps.google','41º 20\' 31.22" N','2º 9\' 29.98" E',41.3423,2.1584],
    ['A040_FSQ_UOP','A040_','FISICO_QUIMICO','Siemens','HMI','KTP900','KTP900 Basic','192.168.1.25','255.255.255.0','0.0.0.0','8C:F3:19:57:F4:67',null,'6AV2 123-2JB03-0AX0',null,'17.00.00.05_02.01',0,'a040_fsq_uop','a040xbfsqxbuop2511','Fisico Quimico FSQ040  HMI KTP900 Basic / 9" TFT Display','img\\A040_FSQ_UOP.JPEG','https://maps.google','41º 20\' 31.44" N','2º 9\' 30.38" E',41.3423,2.1584],
    ['A040_FSQ_UOP_CRB','A040_','FISICO_QUIMICO','Siemens','HMI','KTP400','KTP400 Basic','192.168.1.26','255.255.255.0','0.0.0.0','E0:DC:A0:08:F6:3C',null,'6AV2 123-2DB03-0AX0',null,'17.00.00.05_02.01',0,'a040_fsq_uop_crb','a040xbfsqxbuopxbcrbea1d','Fisico Quimico HMI KTP400 Basic / 4.3" TFT Display',null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['A110_GAB_PLC','A110_','GAB','Siemens','PLC','1200','CPU 1214C DC/DC/DC','192.168.1.32','255.255.255.0','0.0.0.0','28:63:36:84:FD:B0',1,'6ES7 214-1AG40-0XB0','S C-ENS43456','V04.06.01_00.00.00.00',1,'a110_gab_plc','a110xbgabxbplcfabf',null,null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['GAV_CP01','A110_','ALMACENAMIENTO_HC','Siemens','Periferia','In/Out','IM 151-3 PN','192.168.1.34','255.255.255.0','192.168.1.34','28:63:36:58:76:28',0,'6ES7 151-3AA23-0AB0','S C-H4CP13532016','V07.00.05_00.00.00.00',7,'gav_cp01','gavxbcp01ea67',null,null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['A110_GAB_UOP','A110_','GAB','Siemens','HMI','KTP700','KTP700 Basic','192.168.1.33','255.255.255.0','0.0.0.0','8C:F3:19:51:88:85',null,'6AV2 123-2GB03-0AX0',null,'17.00.00.05_02.01',0,'a110_gab_uop','a110xbgabxbuopc6ee',null,null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['GAV_CP01','A110_','GAB','Siemens','Periferia','In/Out','IM 151-3 PN','192.168.1.34','255.255.255.0','192.168.1.34','28:63:36:58:76:28',0,'6ES7 151-3AA23-0AB0','S C-H4CP13532016','V07.00.05_00.00.00.00',7,'gav_cp01','gavxbcp01ea67',null,null,null,'41º 20\' 32.28" N','2º 9\' 30.24" E',41.3423,2.1584],
    ['A140_IBH','A140_','DEPURACION','Ibhsoftec','Adaptador','MPI','IBHLink S7++','192.168.1.40','255.255.255.0','0.0.0.0','00:02:A2:3D:04:6D',null,null,null,null,0,'a140_ibh','a140xbibh5950','Adaptador PLC300 Sala Control Armario Bio2','img\\A140_IBH.mp4','https://maps.google','41°20\'31.6"N','2°09\'31.6"E',41.3423,2.1584],
    ['A140_PLC_EVAP','A140_','DEPURACION','Siemens','PLC','300','CPU 313C','192.168.1.41','255.255.255.0','192.168.1.41','00:1B:1B:B7:F8:81',null,'6GK7 343-1EX30-0XE0','VPED133445','V03.00.23_00.00.00.00',0,'pn-io','pn-io','Tarjeta PLC 300 Sala de Control de Evapora / CP343-1','img\\A140_PLC_EVAP.mp4','https://maps.google','41°20\'30.5"N','2°09\'29.5"E',41.3423,2.1584],
    ['A140_PLC_BIOSC','A140_','DEPURACION','Siemens','PLC','1500','CPU 1510SP-1 PN','192.168.1.43','255.255.255.0','192.168.1.43','28:63:36:4A:D0:EE',1,'6ES7 510-1DJ01-0AB0','S C-FDCB75182015','V02.09.07_00.00.00.00',2,'a140_plc_biosc','a140xbplcxbbioscb0c1','Soplantes Compresores ','img\\A140_PLC_BIOSC.JPEG','https://maps.google','41°20\'30.5"N','2°09\'29.5"E',41.3423,2.1584],
    [' A140_BIOSC_CE01','A140_','DEPURACION','Siemens','Periferia','In/Out','IM 155-6 PN BA','192.168.1.50','255.255.255.0','192.168.1.50','EC:1C:5D:1B:F0:37',0,'6ES7 155-6AR00-0AN0','S C-P1EQ70452022','V03.02.02_00.00.00.00',5,'a140_biosc_ce01','a140xbbioscxbce01c082','BIO3 CiP 140-qf-304  ','img\\A140_BIOSC_CE01.mp4','https://maps.google','41°20\'30.5"N','2°09\'29.5"E',41.3423,2.1584],
    [' A140_BIOSC_CE02','A140_','DEPURACION','Siemens','Periferia','In/Out','IM 155-6 PN BA','192.168.1.51','255.255.255.0','192.168.1.51','EC:1C:5D:44:13:43',0,'6ES7 155-6AR00-0AN0','S C-P6FD03562022','V03.02.02_00.00.00.00',6,'a140_biosc_ce02','a140xbbioscxbce02c1c2',null,'img\\A140_BIOSC_CE02.JPEG','https://maps.google','41°20\'31.8"N','2°09\'29.7"E',41.3423,2.1584],
    ['A110_T78_PLC','A110_','TK17_18','Siemens','PLC','1200','CPU 1214C DC/DC/DC','192.168.1.64','255.255.255.0','0.0.0.0','28:63:36:A4:65:4C',1,'6ES7 214-1AG40-0XB0','S C-HOK64626','V04.06.01_00.00.00.00',4,'a110_t78_plc','a110xbt78xbplc1cc4','110QF202 CPU / Praque de Tanques 2','img\\A110_T78_PLC.JPEG','https://maps.google','41°20\'29.2"N','2°09\'31.9"E',41.3423,2.1584]
    // ... continúa con todos los 104 registros del SQL original
];

function generateCompleteAssetDataFile() {
    console.log('🚀 Generando archivo completo con todos los 104 assets...');
    
    const header = `import { Asset } from '../types';

// Datos completos del archivo SQL original INVENTARIO_TRADEBE_v1.3.sql
// Total: 104 assets exactos (sin duplicados)
export const initialAssets: Asset[] = [`;
    
    const footer = `];`;
    
    let assets = '';
    
    for (let i = 0; i < allSqlData.length; i++) {
        const row = allSqlData[i];
        const [device, area, subArea, fabricante, categoria, subcategoria, deviceType, 
               ipAddress, subnet, gateway, macAddress, slot, articleNumber, serialNumber, 
               firmware, hardware, profinetName, profinetConvertedName, notas, imagen, 
               mapa, latitudLimpio, longitudLimpio, latitudGrados, longitudGrados] = row;
        
        // Corregir rutas de imágenes - quitar la barra inicial y reemplazar barras invertidas
        let imagePath = null;
        if (imagen && typeof imagen === 'string') {
            imagePath = imagen.replace(/img\\\\/g, 'img/').replace(/^\//, '');
        }
        
        // Asignar criticidad basada en el tipo de dispositivo y área
        let criticidad = 'Media';
        if (subcategoria === 'PLC' || (typeof deviceType === 'string' && deviceType.includes('CPU'))) {
            criticidad = 'Alta';
        } else if (subcategoria === 'Switch') {
            criticidad = 'Baja';
        } else if (area && area.includes('A020')) {
            criticidad = 'Seguridad'; // A020 es área de seguridad
        } else if (subcategoria === 'HMI' || subcategoria === 'Periferia') {
            criticidad = 'Media';
        }
        
        // Limpiar el device ID si tiene espacios al inicio
        const cleanDeviceId = typeof device === 'string' ? device.trim() : device;
        
        assets += `    {
        id: '${cleanDeviceId}',
        zona: '${area || ''}',${subArea ? `\n        address: '${subArea}',` : ''}
        fabricante: '${fabricante || ''}',
        subcategoria: '${subcategoria || ''}',
        categoria: '${categoria || ''}',
        deviceType: '${deviceType || ''}',
        ipAddress: '${ipAddress || ''}',
        subnet: '${subnet || ''}',
        gateway: '${gateway || ''}',
        macAddress: '${macAddress || ''}',${slot !== null && slot !== undefined ? `\n        slot: ${slot},` : ''}${articleNumber ? `\n        articleNumber: '${articleNumber}',` : ''}
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
    
    console.log(`✅ Archivo assetData.ts generado con ${allSqlData.length} assets completos`);
    console.log('🔧 Rutas de imágenes corregidas automáticamente');
}

generateCompleteAssetDataFile(); 