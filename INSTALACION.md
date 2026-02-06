# 🚀 GUÍA COMPLETA: Configuración e Instalación de Sl Studio

## 📋 Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Instalación de Dependencias](#instalación-de-dependencias)
3. [Crear Assets Necesarios](#crear-assets-necesarios)
4. [Configuración Final](#configuración-final)
5. [Ejecutar en Modo Desarrollo](#ejecutar-en-modo-desarrollo)
6. [Construir el Instalador](#construir-el-instalador)
7. [Distribución](#distribución)
8. [Solución de Problemas](#solución-de-problemas)

---

## 1. Requisitos Previos

### Software Necesario:
- ✅ **Node.js v16+** - [Descargar](https://nodejs.org/)
- ✅ **npm** (viene con Node.js)
- ✅ **Windows 10/11** (64-bit)
- ✅ **Visual Studio Build Tools** (para compilar better-sqlite3)

### Instalar Build Tools:
```bash
npm install --global windows-build-tools
```

O instalar manualmente desde: https://visualstudio.microsoft.com/downloads/

---

## 2. Instalación de Dependencias

### Paso 1: Abrir terminal en la carpeta del proyecto
```bash
cd /ruta/a/sl-studio
```

### Paso 2: Instalar dependencias
```bash
npm install
```

Esto instalará:
- electron
- electron-builder
- better-sqlite3
- bcryptjs

### Paso 3: Verificar instalación
```bash
npm list
```

---

## 3. Crear Assets Necesarios

### Iconos de la Aplicación

Necesitas crear los siguientes archivos de imagen:

#### 3.1 Logo Principal (SVG)
**Ubicación**: `assets/icons/logo.svg`

Puedes crear un SVG simple con este contenido:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00d9ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8000ff;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="url(#grad)"/>
  <text x="50" y="65" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="white" text-anchor="middle">SL</text>
</svg>
```

#### 3.2 Icono PNG (para la barra de título)
**Ubicación**: `assets/icons/icon.png`

Crea un PNG de 256x256 píxeles con el logo de Sl Studio. Puedes usar herramientas online como:
- https://www.canva.com (gratis)
- https://www.figma.com (gratis)
- GIMP (software gratuito)

#### 3.3 Icono ICO (para Windows)
**Ubicación**: `assets/icon.ico`

Convierte el PNG a ICO usando:
- https://convertio.co/png-ico/
- https://www.icoconverter.com/

**Importante**: El ICO debe incluir múltiples tamaños:
- 16x16
- 32x32
- 48x48
- 64x64
- 128x128
- 256x256

### Alternativa Rápida (Placeholder):

Si no tienes tiempo para crear iconos profesionales, puedes usar emojis temporalmente:

1. Descarga iconos de emoji de: https://openmoji.org/
2. Busca iconos relacionados con educación (📚, 🎓, 💻)
3. Renómbralos y colócalos en las ubicaciones correspondientes

---

## 4. Configuración Final

### 4.1 Verificar package.json

Asegúrate de que el archivo `package.json` tenga la configuración correcta:

```json
{
  "name": "sl-studio",
  "version": "1.0.0",
  "description": "Hub educativo para estudiantes chilenos",
  "main": "src/main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder",
    "build:win": "electron-builder --win --x64"
  }
}
```

### 4.2 Crear archivo .gitignore (opcional)

Si usarás Git, crea `.gitignore`:

```
node_modules/
dist/
*.log
.DS_Store
*.db
*.db-journal
```

---

## 5. Ejecutar en Modo Desarrollo

### Paso 1: Iniciar la aplicación
```bash
npm start
```

### Paso 2: Verificar funcionamiento
- ✅ La ventana debe abrirse
- ✅ Debe mostrar pantalla de carga
- ✅ Luego mostrar pantalla de login
- ✅ Los CAPTCHAs deben funcionar
- ✅ Puedes crear una cuenta de prueba

### Paso 3: Probar funcionalidades
1. **Registro**: Crea una cuenta nueva
2. **Login**: Inicia sesión con la cuenta creada
3. **Horarios**: Agrega un horario de prueba
4. **Cursos**: Crea un curso
5. **Configuración**: Cambia el tema de color
6. **Apps**: Haz clic en una app (debe abrir en el navegador)

---

## 6. Construir el Instalador

### Paso 1: Build para Windows
```bash
npm run build:win
```

### Paso 2: Esperar la compilación
Esto puede tomar 5-15 minutos dependiendo de tu PC.

### Paso 3: Verificar archivos generados
Busca en la carpeta `dist/`:
- ✅ `Sl Studio Setup 1.0.0.exe` - Instalador completo
- ✅ `Sl Studio 1.0.0.exe` - Versión portable

### Tamaños esperados:
- Instalador: ~150-200 MB
- Portable: ~200-250 MB

---

## 7. Distribución

### 7.1 Probar el Instalador

1. **Ejecuta el instalador** en tu PC
2. **Sigue el asistente**:
   - Acepta la licencia
   - Elige directorio de instalación
   - Marca opciones de accesos directos
3. **Instala la aplicación**
4. **Ejecuta Sl Studio** desde el menú inicio o escritorio

### 7.2 Compartir con tu Colegio

**Opciones de distribución**:

#### Opción A: Google Drive / OneDrive
1. Sube el instalador a la nube
2. Comparte el enlace con permisos de descarga
3. Comparte instrucciones de instalación

#### Opción B: USB
1. Copia el instalador a una memoria USB
2. Comparte físicamente con compañeros
3. Incluye un archivo de instrucciones

#### Opción C: GitHub Releases (Recomendado)
1. Crea un repositorio en GitHub
2. Ve a "Releases"
3. Crea una nueva release
4. Sube el archivo .exe
5. Comparte el enlace de descarga

---

## 8. Solución de Problemas

### Problema: Error al instalar dependencias

**Error**: `gyp ERR! build error`

**Solución**:
```bash
npm install --global windows-build-tools
npm install
```

---

### Problema: La aplicación no inicia

**Síntomas**: Ventana negra o cierra inmediatamente

**Solución**:
1. Verifica que los archivos estén en su lugar:
   ```bash
   ls src/main.js
   ls src/preload.js
   ls src/renderer/index.html
   ```

2. Ejecuta con logs:
   ```bash
   npm start > log.txt 2>&1
   ```

3. Revisa `log.txt` para ver errores

---

### Problema: Error con SQLite

**Error**: `Cannot find module 'better-sqlite3'`

**Solución**:
```bash
npm rebuild better-sqlite3
```

---

### Problema: Las apps no se abren

**Síntoma**: Al hacer clic en una app, nada pasa

**Solución**:
1. Verifica que `apps-data.js` esté cargado
2. Abre DevTools (F12) y busca errores en consola
3. Verifica que `preload.js` exponga correctamente las APIs

---

### Problema: El instalador no se genera

**Error durante build**:

**Soluciones**:

1. **Verifica que icon.ico exista**:
   ```bash
   ls assets/icon.ico
   ```

2. **Instala electron-builder globalmente**:
   ```bash
   npm install -g electron-builder
   electron-builder --win
   ```

3. **Limpia caché y reintenta**:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   npm run build:win
   ```

---

### Problema: Base de datos corrupta

**Síntoma**: Error al iniciar sesión o guardar datos

**Solución**:
1. Cierra la aplicación
2. Elimina el archivo de base de datos:
   - Windows: `C:\Users\[TuUsuario]\AppData\Roaming\sl-studio\slstudio.db`
3. Reinicia la aplicación (creará una nueva BD)

---

## 📱 Datos de Prueba Sugeridos

Para probar la aplicación, usa estos datos:

### Usuario 1:
- Nombre: Juan
- Apellido: Pérez
- Username: jperez
- Email: jperez@gmail.com
- PIN: 1234
- Password: password123
- Nivel: Secundaria
- Curso: 3° Medio

### Usuario 2:
- Nombre: María
- Apellido: González
- Username: mgonzalez
- Email: mgonzalez@gmail.com
- PIN: 5678
- Password: password456
- Nivel: Primaria
- Curso: 6° Básico

---

## ✅ Checklist Final

Antes de distribuir, verifica:

- [ ] La aplicación inicia correctamente
- [ ] Puedes registrar nuevos usuarios
- [ ] Puedes iniciar sesión
- [ ] Los horarios se guardan correctamente
- [ ] Los cursos se crean correctamente
- [ ] Los temas de color funcionan
- [ ] El modo claro/oscuro funciona
- [ ] Las apps abren en el navegador
- [ ] El instalador funciona en otra PC
- [ ] La desinstalación funciona correctamente

---

## 🎉 ¡Listo!

Si completaste todos los pasos, ¡Sl Studio está listo para usar!

### Próximos Pasos:

1. **Prueba con compañeros**: Pide a 2-3 personas que prueben la app
2. **Recopila feedback**: Anota problemas y sugerencias
3. **Itera**: Mejora la app basándote en el feedback
4. **Presenta**: Muestra Sl Studio a tu colegio

### Recursos Adicionales:

- **Electron Docs**: https://www.electronjs.org/docs
- **SQLite Docs**: https://www.sqlite.org/docs.html
- **Node.js Docs**: https://nodejs.org/docs

---

**¿Tienes dudas?** Revisa el README.md o consulta la documentación oficial de las tecnologías usadas.

¡Mucho éxito con Sl Studio! 🚀🇨🇱
