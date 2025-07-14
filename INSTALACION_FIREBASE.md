# 🚀 Guía de Instalación - Dashboard de Inventario OT en Firebase

Esta guía te llevará paso a paso para desplegar tu Dashboard de Inventario de Activos Operacionales en Firebase.

## ✅ Prerrequisitos Completados

Tu proyecto ya tiene configurado:
- ✅ **Vite + React + TypeScript**
- ✅ **Firebase SDK v10.12.2**
- ✅ **Estructura del proyecto**
- ✅ **Datos de prueba estructurados**
- ✅ **Servicios Firebase creados**

## 📋 Pasos de Instalación

### Paso 1: Instalar Dependencias
```bash
npm install
```

### Paso 2: Verificar Configuración Firebase
El archivo `firebase.ts` ya está creado con tu configuración:
- ✅ Proyecto: `inventariotradebev0`
- ✅ Servicios: Auth, Firestore, Storage

### Paso 3: Cargar Datos Iniciales a Firestore

#### Opción A: Usando el Script de Migración (Recomendado)
```bash
npm run migrate
```

#### Opción B: Manual desde la Consola Firebase
1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Selecciona tu proyecto `inventariotradebev0`
3. Ve a **Firestore Database**
4. Crea estas colecciones:
   - `users` - Agrega el usuario admin:
     ```json
     {
       "name": "admin",
       "password": "admin", 
       "role": "Admin"
     }
     ```
   - `assets` - Copia algunos assets de `data/assetData.ts`
   - `manufacturers` - Copia fabricantes de `data/lookupData.ts`
   - `subcategories` - Copia subcategorías
   - `zonas` - Copia zonas

### Paso 4: Probar Localmente
```bash
npm run dev
```
- Abre http://localhost:5173
- Inicia sesión con: `admin` / `admin`

### Paso 5: Desplegar a Firebase Hosting

#### Instalar Firebase Tools (si no lo tienes)
```bash
npm install -g firebase-tools
```

#### Configurar Firebase Hosting
```bash
firebase login
firebase init
```

**Configuración recomendada:**
- ✅ Hosting: Configure files for Firebase Hosting
- ✅ Use an existing project: `inventariotradebev0`
- ✅ Public directory: `dist`
- ✅ Single-page app: `Y`
- ❌ GitHub setup: `N` (por ahora)

#### Construir y Desplegar
```bash
npm run build
firebase deploy
```

## 🎯 Credenciales de Acceso

### Usuarios por Defecto:
- **Admin**: `admin` / `admin`
- **Supervisor**: `supervisor` / `supervisor`  
- **Operador**: `operator` / `operator`

## 🔧 Características Implementadas

### 🔥 **Integración Firebase**
- **Firestore**: Base de datos en tiempo real
- **Authentication**: Sistema de usuarios
- **Hosting**: Desplegable en la web

### 📊 **Funcionalidades**
- **Dashboard**: Métricas y gráficos en tiempo real
- **Gestión de Assets**: CRUD completo
- **Gestión de Usuarios**: Solo para Administradores
- **Filtros Avanzados**: Por zona, fabricante, etc.
- **Exportación**: PDF y Excel
- **Responsive**: Funciona en móviles y tablets

### 🛡️ **Seguridad**
- **Control de Acceso**: Roles de usuario
- **Validación**: Formularios con validación
- **Firebase Rules**: Seguridad a nivel de base de datos

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
├── data/               # Datos iniciales (para migración)
├── services/           # Servicios Firebase
├── scripts/            # Scripts de migración
├── firebase.ts         # Configuración Firebase
└── types.ts           # Tipos TypeScript
```

## 🚨 Notas Importantes

1. **Ejecutar migración solo UNA VEZ** para evitar datos duplicados
2. **Los errores de linter se resuelven** después de `npm install`
3. **Regenerar API Key** después del deployment por seguridad
4. **Firebase Hosting URL** será proporcionada después del deploy

## 🆘 Solución de Problemas

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Firebase project not found"
```bash
firebase login
firebase use inventariotradebev0
```

### Assets no se muestran
- Verificar que Firestore tenga datos
- Ejecutar `npm run migrate` si está vacío

## 🎉 ¡Listo!

Tu Dashboard OT estará disponible en la URL que Firebase proporcione después del deploy. 

**URL típica**: `https://inventariotradebev0.web.app` 