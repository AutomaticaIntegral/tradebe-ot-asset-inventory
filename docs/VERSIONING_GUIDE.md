# 🔖 Guía de Versionado - Dashboard Inventario OT

Esta guía explica cómo manejar las versiones del proyecto y dónde documentar los cambios.

## 📍 **¿Dónde mantener el índice de versiones?**

### 🎯 **Ubicaciones Recomendadas (por orden de importancia):**

1. **`CHANGELOG.md`** *(Raíz del proyecto)* - **PRINCIPAL**
   - ✅ Historial completo de cambios
   - ✅ Formato estándar de la industria
   - ✅ Legible por humanos y máquinas
   - ✅ Se versiona junto con el código

2. **GitHub Releases** *(En el repositorio)* - **PARA USUARIOS**
   - ✅ Versiones públicas y oficiales
   - ✅ Descarga directa de código
   - ✅ Notificaciones automáticas
   - ✅ Ideal para distribución

3. **`package.json`** *(Ya configurado)* - **TÉCNICO**
   - ✅ Versión actual automática
   - ✅ Integrado con npm/node
   - ✅ Para builds y CI/CD

4. **`README.md`** *(Sección de versiones)* - **OVERVIEW**
   - ✅ Versión actual visible
   - ✅ Enlaces a documentación detallada
   - ✅ Estado del proyecto

## 🚀 **Workflow Recomendado para Nuevas Versiones**

### Paso 1: Desarrollo y Testing
```bash
# Trabajar en feature branch
git checkout -b feature/nueva-funcionalidad
# ... desarrollo ...
git commit -m "feat: añadir nueva funcionalidad"
```

### Paso 2: Actualizar Documentación
1. **Actualizar `CHANGELOG.md`**:
   ```markdown
   ## [1.1.0] - 2024-02-15
   ### ✨ Añadido
   - Nueva funcionalidad de búsqueda avanzada
   ```

2. **Actualizar `package.json`**:
   ```bash
   npm version minor  # Para v1.1.0
   # o
   npm version patch  # Para v1.0.1
   # o
   npm version major  # Para v2.0.0
   ```

### Paso 3: Merge y Tag
```bash
git checkout main
git merge feature/nueva-funcionalidad
git tag v1.1.0
git push origin main --tags
```

### Paso 4: Crear GitHub Release
1. Ir a GitHub → **Releases** → **Create a new release**
2. **Tag**: `v1.1.0`
3. **Title**: `🚀 Dashboard v1.1.0 - Búsqueda Avanzada`
4. **Description**: Copiar del CHANGELOG.md
5. **Publish release**

### Paso 5: Actualizar README
```markdown
### Versión Actual: `v1.1.0` 🆕
- **Fecha de Release**: Febrero 2024
```

## 📋 **Convenciones de Versionado**

### Versionado Semántico (SemVer)
```
v MAJOR . MINOR . PATCH
  2   .   1   .   3
```

- **MAJOR** (2.0.0): Cambios incompatibles
- **MINOR** (1.1.0): Nuevas funcionalidades compatibles  
- **PATCH** (1.0.1): Correcciones de errores

### Tipos de Commits (Conventional Commits)
```bash
feat:     Nueva funcionalidad
fix:      Corrección de error
docs:     Cambios en documentación
style:    Cambios de formato/estilo
refactor: Refactorización de código
test:     Añadir/modificar tests
chore:    Tareas de mantenimiento
```

## 📁 **Estructura de Archivos de Versionado**

```
tu-proyecto/
├── CHANGELOG.md           # 📝 Historial completo
├── README.md             # 📋 Versión actual + links
├── package.json          # 🔧 Versión técnica
├── docs/
│   └── VERSIONING_GUIDE.md # 📖 Esta guía
└── .github/
    └── workflows/
        └── release.yml    # 🤖 Automatización
```

## 🤖 **Automatización Avanzada (Opcional)**

### GitHub Actions para Releases Automáticos
```yaml
# .github/workflows/release.yml
name: Create Release
on:
  push:
    tags:
      - 'v*'
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Create Release
        uses: actions/create-release@v1
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body_path: CHANGELOG.md
```

### Scripts NPM Útiles
```json
{
  "scripts": {
    "version:patch": "npm version patch && git push --tags",
    "version:minor": "npm version minor && git push --tags", 
    "version:major": "npm version major && git push --tags",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
```

## ✅ **Checklist para Nuevas Versiones**

### Antes del Release:
- [ ] Tests pasando
- [ ] Documentación actualizada
- [ ] CHANGELOG.md actualizado
- [ ] README.md revisado
- [ ] Version en package.json actualizada

### Durante el Release:
- [ ] Tag creado en Git
- [ ] GitHub Release publicado  
- [ ] Deploy a producción
- [ ] URLs de producción verificadas

### Después del Release:
- [ ] Comunicar a stakeholders
- [ ] Actualizar documentación externa
- [ ] Planificar próxima versión

## 🎯 **Recomendación Final**

**Para tu proyecto Dashboard OT de Tradebe, mantén:**

1. **`CHANGELOG.md`** - Como fuente principal de verdad
2. **GitHub Releases** - Para versiones oficiales públicas  
3. **README.md actualizado** - Con link al CHANGELOG
4. **Tags de Git** - Para control de versiones técnico

Esto te dará un sistema profesional y completo de versionado. 🚀 