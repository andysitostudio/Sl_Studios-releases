# 🚀 ACTUALIZACIÓN RÁPIDA A v2.1.0

## ✅ YA ESTÁ LISTO

He creado el proyecto completo v2.1.0 con TODOS los cambios implementados.

## 📥 Descargar e Instalar

### Paso 1: Descargar
Descarga el archivo: `sl-studio-v2.1.0.zip`

### Paso 2: Descomprimir
Descomprime en: `D:\Downloads\`

### Paso 3: Instalar Dependencias
```powershell
cd D:\Downloads\sl-studio-v2.1.0
npm install
```

### Paso 4: Probar
```powershell
npm start
```

### Paso 5: Actualizar en GitHub

```powershell
# Inicializar Git
git init
git remote add origin https://github.com/andysitostudio/Sl_Studios-releases.git

# Obtener la rama main
git fetch origin main
git reset --hard origin/main

# Agregar cambios
git add .
git commit -m "feat: actualización v2.1.0 con nuevas características"

# Subir
git branch -M main
git push -f origin main
```

---

## ✨ Cambios Implementados en v2.1.0

### 1. ✅ Edición de Datos Personales
- Desde **Configuración > Cuenta** puedes editar:
  - Nombre y Apellido
  - Nickname
  - Teléfono
  - RUT
  - Número de Documento
  - Email
- Botones para cambiar Contraseña y PIN

### 2. ✅ Cambio Rápido de Cuenta
- Nuevo botón "🔄 Cambiar Cuenta" en el sidebar (abajo, antes de Configuración)
- Cambio rápido con solo PIN de cuenta actual y cuenta objetivo

### 3. ✅ Nuevas Aplicaciones
**Agregadas 6 nuevas apps:**
- Canva 🎨
- Visual Studio 💻
- Code.org 🧑‍💻
- Scratch 🐱
- Notion 📝
- Calculadora 🔢

### 4. ✅ Nuevas IAs
**Agregadas 2 nuevas IAs:**
- Meta AI 🤖
- Tess AI 💬
(Gemini ya estaba en la lista de Google)

### 5. ✅ Nuevos Colores
**3 colores nuevos:**
- Azul Oscuro (#1e3a8a)
- Rosado Claro (#ffc0cb)
- Rosado Suave (#ffb6c1)

### 6. ✅ Campo Número de Documento
- Nuevo campo opcional en el registro
- Se puede editar desde Configuración > Cuenta

### 7. ✅ Códigos de Curso de 16 Dígitos
**Antes:** Códigos cortos de 8 caracteres
**Ahora:** Códigos de 16 caracteres con formato:
```
Ejemplo: Zx7?a-82Pa#-@m?O-QW=5
```

### 8. ✅ Unirse a Cursos
- Nuevo botón "Unirse a Curso" en la vista de Cursos
- Ingresa el código de 16 dígitos y únete al grupo

---

## 🎯 Cómo Usar las Nuevas Características

### Editar Datos Personales
1. Ve a **Configuración** (engranaje en sidebar)
2. Sección **Cuenta**
3. Click en "✏️ Editar Datos"
4. Modifica lo que necesites
5. Click en "💾 Guardar Cambios"

### Cambiar Contraseña o PIN
1. Ve a **Configuración > Cuenta**
2. Click en "🔒 Cambiar Contraseña" o "🔑 Cambiar PIN"
3. Ingresa contraseña/PIN actual
4. Ingresa nueva contraseña/PIN
5. Confirma

### Cambiar de Cuenta
1. Click en **🔄 Cambiar Cuenta** (sidebar, abajo)
2. Ingresa PIN de tu cuenta actual
3. Ingresa nombre de usuario de la otra cuenta
4. Ingresa PIN de la otra cuenta
5. ¡Listo! Cambio instantáneo

### Crear Curso
1. Ve a **Cursos** (sidebar)
2. Click en "+ Crear Curso"
3. Ingresa nombre y descripción
4. Se genera código automático de 16 dígitos
5. Comparte el código con tus compañeros

### Unirse a Curso
1. Ve a **Cursos** (sidebar)
2. Click en "Unirse a Curso"
3. Ingresa el código de 16 dígitos
4. ¡Listo! Ya eres miembro

---

## 📋 Archivos Modificados

- ✅ `package.json` - Versión actualizada a 2.1.0
- ✅ `src/database/db.js` - Nuevos métodos y campo numero_documento
- ✅ `src/main.js` - Nuevos handlers IPC
- ✅ `src/preload.js` - Nuevas APIs expuestas
- ✅ `src/renderer/index.html` - Campo número de documento y botón cambiar cuenta
- ✅ `src/renderer/js/auth.js` - Registro con número de documento
- ✅ `src/renderer/js/apps-data.js` - 6 nuevas apps + 2 nuevas IAs
- ✅ `src/renderer/js/settings.js` - Edición de perfil completa
- ✅ `src/renderer/js/courses.js` - Unirse a cursos con código
- ✅ `src/renderer/styles/themes.css` - 3 colores nuevos

---

## 🐛 Correcciones Incluidas

### Fix 1: Crear Cursos
**Problema:** No se podía escribir en el formulario
**Solución:** Formulario completamente funcional con código de 16 dígitos

### Fix 2: Unirse a Cursos
**Problema:** No había opción para ingresar código
**Solución:** Botón "Unirse a Curso" con modal para ingresar código

---

## 🎉 ¡Listo para Probar!

Una vez que ejecutes `npm start`, podrás:
1. Registrar una nueva cuenta con número de documento
2. Editar tus datos personales
3. Cambiar contraseña y PIN
4. Crear cursos con códigos de 16 dígitos
5. Unirte a cursos con códigos
6. Cambiar entre cuentas rápidamente
7. Usar las nuevas apps y colores

---

## 📊 Próxima Fase: v2.2.0

En la v2.2.0 agregaremos:
- 🔒 Sistema de seguridad con IPs
- 🖼️ Fondos personalizados
- 🎵 Reproductor de música con playlists
- 🌤️ Widget del clima
- 📅 Calendario semanal con horarios fijos

---

**¿Algún problema? Avísame y lo corregimos antes de seguir a v2.2.0**
