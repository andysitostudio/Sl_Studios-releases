# 🚀 GUÍA COMPLETA: Publicar Sl Studio en GitHub

## 📋 Pasos para Subir el Proyecto

### 1️⃣ Preparar el Repositorio en GitHub

1. **Ve a GitHub**: https://github.com
2. **Inicia sesión** con tu cuenta `andysitostudio`
3. **Crea un nuevo repositorio**:
   - Nombre: `Sl_Studios-releases`
   - Descripción: "Hub de acceso eficiente a Microsoft 365 y Google Workspace para estudiantes chilenos"
   - Visibilidad: **Público** (para que cualquiera pueda descargarlo)
   - ✅ Marca "Add a README file"
   - ✅ Marca "Add .gitignore" → Selecciona "Node"
   - Licencia: MIT

4. **Copia la URL del repositorio**: 
   ```
   https://github.com/andysitostudio/Sl_Studios-releases.git
   ```

---

### 2️⃣ Preparar el Proyecto Localmente

#### Opción A: Desde la Carpeta Descargada

```bash
# Navega a la carpeta del proyecto
cd ruta/a/sl-studio

# Inicializa Git
git init

# Agrega el repositorio remoto
git remote add origin https://github.com/andysitostudio/Sl_Studios-releases.git

# Agrega todos los archivos
git add .

# Haz el primer commit
git commit -m "feat: lanzamiento inicial de Sl Studio v2.000024372.2"

# Sube al repositorio
git push -u origin main
```

#### Opción B: Si Git pide credenciales

Si GitHub pide usuario y contraseña:

1. **Genera un Personal Access Token**:
   - Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token
   - Nombre: "Sl Studio Releases"
   - Expiration: No expiration
   - Permisos: ✅ repo (todos)
   - Generate token
   - **GUARDA EL TOKEN** (solo se muestra una vez)

2. **Usa el token como contraseña**:
   ```bash
   Username: andysitostudio
   Password: [pega aquí tu token]
   ```

---

### 3️⃣ Crear el Primer Release

#### Paso 1: Construir la Aplicación

```bash
# Asegúrate de estar en la carpeta del proyecto
cd sl-studio

# Instala dependencias
npm install

# Construye el instalador
npm run build:win
```

Esto generará en `dist/`:
- `Sl Studio Setup 2.000024372.2.exe`
- `Sl Studio 2.000024372.2.exe`

#### Paso 2: Renombrar los Archivos (Opcional pero Recomendado)

```bash
# Renombra para mejor identificación
cd dist
mv "Sl Studio Setup 2.000024372.2.exe" "Sl.Studio.Setup.v2.000024372.2.exe"
mv "Sl Studio 2.000024372.2.exe" "Sl.Studio.v2.000024372.2.exe"
```

#### Paso 3: Crear Release en GitHub

1. **Ve a tu repositorio** en GitHub
2. **Haz clic en "Releases"** (en el menú derecho)
3. **Haz clic en "Create a new release"**

4. **Configura el release**:
   - **Tag version**: `v2.000024372.2`
   - **Release title**: `Sl Studio v2.000024372.2 - Lanzamiento Inicial`
   - **Description**: 
   
   ```markdown
   # 🎉 Lanzamiento Inicial de Sl Studio
   
   Primera versión estable de Sl Studio, el hub educativo para estudiantes chilenos.
   
   ## ✨ Características Principales
   
   - 🚀 Acceso rápido a 46+ aplicaciones educativas
   - 📅 Gestión de horarios y pruebas
   - 👥 Sistema de cursos colaborativos
   - 🎨 24+ temas de color personalizables
   - 🔒 Seguridad y privacidad (Ley 19.628 Chile)
   - 🔄 Sistema de actualizaciones automáticas
   
   ## 📥 Descarga
   
   **Recomendado para la mayoría de usuarios:**
   - `Sl.Studio.Setup.v2.000024372.2.exe` - Instalador completo
   
   **Versión portable (no requiere instalación):**
   - `Sl.Studio.v2.000024372.2.exe` - Ejecutable portable
   
   ## 📋 Requisitos
   
   - Windows 10/11 (64-bit)
   - 4 GB RAM
   - 500 MB espacio en disco
   
   ## 🚀 Instalación
   
   1. Descarga el instalador
   2. Ejecuta `Sl.Studio.Setup.v2.000024372.2.exe`
   3. Sigue el asistente de instalación
   4. ¡Listo!
   
   ## 📖 Documentación
   
   Consulta el [README](https://github.com/andysitostudio/Sl_Studios-releases) para más información.
   
   ---
   
   **Desarrollado para estudiantes chilenos 🇨🇱**
   ```

5. **Sube los archivos**:
   - Arrastra y suelta los 2 archivos .exe
   - O haz clic en "Attach binaries" y selecciónalos

6. **Marca como "Latest release"** ✅

7. **Haz clic en "Publish release"**

---

### 4️⃣ Actualizar el README Principal

Reemplaza el README.md del repositorio con el contenido de `README-GITHUB.md`:

```bash
# En la carpeta del proyecto
cp README-GITHUB.md README.md
git add README.md
git commit -m "docs: actualizar README con información de GitHub"
git push
```

---

### 5️⃣ Verificar que Todo Funcione

1. **Ve a tu repositorio**: https://github.com/andysitostudio/Sl_Studios-releases
2. **Verifica**:
   - ✅ El README se ve bien
   - ✅ Hay un release publicado
   - ✅ Los archivos .exe están disponibles para descargar
   - ✅ El badge de versión muestra `v2.000024372.2`

3. **Prueba descargar**:
   - Descarga el instalador desde Releases
   - Ejecútalo en una PC limpia
   - Verifica que funcione correctamente

---

## 📦 Estructura de Archivos en GitHub

Tu repositorio debería tener esta estructura:

```
Sl_Studios-releases/
├── .gitignore
├── README.md                 → README-GITHUB.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE.txt
├── INSTALACION.md
├── RESUMEN-PROYECTO.md
├── INICIO-RAPIDO.md
├── package.json
├── src/
│   ├── main.js
│   ├── preload.js
│   ├── database/
│   └── renderer/
└── assets/
```

**No subir a GitHub:**
- ❌ `node_modules/` (está en .gitignore)
- ❌ `dist/` (archivos compilados van solo en Releases)
- ❌ `*.db` (bases de datos de prueba)

---

## 🔄 Cómo Publicar Actualizaciones

### Cuando hagas cambios en el futuro:

1. **Actualiza la versión** en `package.json`:
   ```json
   "version": "2.000024372.3"
   ```

2. **Actualiza CHANGELOG.md**:
   ```markdown
   ## [v2.000024372.3] - 2025-02-10
   
   ### Corregido
   - Bug al guardar horarios con caracteres especiales
   
   ### Añadido
   - Exportar horarios a PDF
   ```

3. **Haz commit y push**:
   ```bash
   git add .
   git commit -m "fix: corregir bug de caracteres especiales en horarios"
   git push
   ```

4. **Construye la nueva versión**:
   ```bash
   npm run build:win
   ```

5. **Crea un nuevo Release**:
   - Tag: `v2.000024372.3`
   - Title: "Sl Studio v2.000024372.3 - Correcciones"
   - Sube los nuevos archivos .exe

6. **Los usuarios recibirán notificación automática** de la actualización cuando abran la app.

---

## 🎯 Configuración de Auto-Updates

El sistema de actualizaciones está configurado para:

1. **Verificar automáticamente** al iniciar la app (después de 3 segundos)
2. **Comparar versión** con GitHub Releases
3. **Notificar al usuario** si hay actualización disponible
4. **Descargar** con permiso del usuario
5. **Instalar** al cerrar la aplicación

El usuario también puede verificar manualmente desde:
**Configuración → Sobre Sl Studio → Buscar Actualizaciones**

---

## 📊 GitHub Actions (Opcional - Avanzado)

Para automatizar el proceso de build, puedes crear un workflow:

`.github/workflows/build.yml`:

```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: windows-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build:win
    
    - name: Release
      uses: softprops/action-gh-release@v1
      with:
        files: dist/*.exe
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Con esto, cada vez que crees un tag (`v2.000024372.3`), GitHub automáticamente construirá y publicará el release.

---

## ✅ Checklist Final

Antes de publicar, verifica:

- [ ] El repositorio está creado en GitHub
- [ ] El código está subido a GitHub
- [ ] El instalador está construido localmente
- [ ] El release está creado con los archivos .exe
- [ ] El README se ve correctamente
- [ ] La versión es `v2.000024372.2`
- [ ] Has probado descargar e instalar
- [ ] Las actualizaciones automáticas funcionan

---

## 🎉 ¡Listo!

Tu repositorio debería verse así:

🔗 https://github.com/andysitostudio/Sl_Studios-releases

Los usuarios podrán:
1. Ir a Releases
2. Descargar el instalador
3. Instalar Sl Studio
4. Recibir actualizaciones automáticas

---

## 📞 Ayuda

Si tienes problemas:

1. **Revisa la configuración** de Git y GitHub
2. **Verifica los permisos** del repositorio (debe ser público)
3. **Asegúrate** de que el token tiene permisos correctos
4. **Consulta** la documentación de electron-builder

---

**¡Éxito con Sl Studio en GitHub! 🚀🇨🇱**
