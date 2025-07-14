# Sistema de Inventario de Activos OT - Tradebe

Dashboard profesional para la gestión de inventario de activos de tecnología operacional (OT) desarrollado por **Automática Integral** para **Tradebe**.

🌐 **Aplicación en vivo**: https://tradebe.automaticaintegral.es/

## Descripción del Proyecto

Este sistema permite la gestión completa del inventario de activos industriales, incluyendo:
- Seguimiento de equipos OT (Tecnología Operacional)
- Gestión de ubicaciones y áreas
- Control de criticidad de activos
- Reportes y análisis de datos
- Gestión de usuarios y permisos

## Características Principales

- 📊 **Dashboard Interactivo**: Visualización de datos en tiempo real
- 🔐 **Sistema de Autenticación**: Control de acceso basado en roles
- 📱 **Diseño Responsivo**: Optimizado para todos los dispositivos
- 📈 **Gráficos y Reportes**: Análisis visual de datos
- 🔄 **Integración Firebase**: Base de datos en tiempo real
- 📤 **Exportación de Datos**: Generación de reportes PDF y Excel

## Branding y Personalización Corporativa

### Cliente: Tradebe
- Logo principal integrado en pantalla de login
- Logo con texto en header de navegación
- Información corporativa en footer
- Colores y estilo visual corporativo

### Desarrollador: Automática Integral
- **Logos integrados discretamente**:
  - Logo transparente en header (muy pequeño)
  - Logo en pantalla de login junto a créditos
  - Logo en footer junto a información de contacto
- Créditos visibles en header, login y footer
- Información de contacto incluida
- Referencias profesionales en documentación

### Estrategia de Branding Equilibrada
- **Tradebe**: Logo prominente como cliente principal
- **Automática Integral**: Presencia discreta pero profesional del desarrollador
- **Diseño balanceado**: Respeto por ambas identidades corporativas
- **Integración visual**: Logos transparentes que se adaptan al tema oscuro

### Optimización SEO
- Metadatos completos en español
- Open Graph tags para redes sociales
- Structured data JSON-LD
- Favicon personalizado con logo de Tradebe
- Keywords específicos del sector industrial
- **Dominio personalizado**: https://tradebe.automaticaintegral.es/

## Tecnologías Utilizadas

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication)
- **Gráficos**: Recharts
- **Exportación**: jsPDF, xlsx
- **Build Tool**: Vite

## Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/AutomaticaIntegral/tradebe-ot-asset-inventory.git
   cd tradebe-ot-asset-inventory
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Firebase:**
   - Configurar las credenciales de Firebase en `firebase.ts`
   - Asegurarse de tener los permisos necesarios para acceder a la base de datos

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Construir para producción:**
   ```bash
   npm run build
   ```

## Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── charts/         # Componentes de gráficos
│   ├── Dashboard.tsx   # Panel principal
│   ├── Header.tsx      # Cabecera con navegación
│   ├── Footer.tsx      # Pie de página corporativo
│   └── ...
├── data/               # Datos estáticos y tipos
├── services/           # Servicios (Firebase, APIs)
├── types.ts           # Definiciones de tipos TypeScript
└── ...
```

## Usuarios por Defecto

- **Admin**: admin/admin
- **Supervisor**: supervisor/supervisor  
- **Operador**: operator/operator

## Deployment y Hosting

### Firebase Hosting
- **URL Principal**: https://tradebe.automaticaintegral.es/
- **URL Backup**: https://inventariotradebev0.web.app
- **Proyecto Firebase**: inventariotradebev0
- **SSL**: Automático (certificado válido)

### Configuración de Dominio Personalizado
El dominio `tradebe.automaticaintegral.es` está configurado como subdominio de `automaticaintegral.es`, reflejando la relación profesional entre:
- **Cliente**: Tradebe
- **Desarrollador**: Automática Integral

### Comandos de Deployment
```bash
# Construir para producción
npm run build

# Deploy a Firebase
firebase deploy --only hosting
```

## Enlaces Importantes

- 🌐 **Aplicación**: https://tradebe.automaticaintegral.es/
- 📱 **Repositorio**: https://github.com/AutomaticaIntegral/tradebe-ot-asset-inventory
- 🔧 **Firebase Console**: https://console.firebase.google.com/project/inventariotradebev0

## Soporte y Mantenimiento

Desarrollado por **Automática Integral**
- Web: https://automaticaintegral.com
- Email: info@automaticaintegral.com

## Cliente

**Tradebe** - Empresa líder en gestión integral de residuos industriales

---

*Este proyecto ha sido desarrollado específicamente para las necesidades de Tradebe en la gestión de sus activos de tecnología operacional.*
