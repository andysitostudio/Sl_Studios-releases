# ✅ SL STUDIO v2.1.0 - CASI LISTO

## 🎉 LO QUE YA FUNCIONA

### ✅ Archivos Actualizados:
1. **db.js** - Base de datos completa con todas las funciones
2. **main.js** - Todos los handlers IPC
3. **preload.js** - APIs expuestas
4. **auth.js** - Registro con número de documento
5. **settings.js** - Edición de perfil COMPLETA
6. **themes.css** - 3 colores nuevos
7. **apps-data.js** - Nuevas apps y AIs
8. **index.html** - Campo número de documento agregado

### ✅ Funcionalidades Implementadas:
- ✅ Registro con número de documento
- ✅ Edición de perfil completa
- ✅ Cambiar contraseña
- ✅ Cambiar PIN
- ✅ 3 colores nuevos (Azul Oscuro, Rosado Claro, Rosado Suave)
- ✅ 6 nuevas apps (Canva, VS Code, Code.org, Scratch, Notion, Calculadora)
- ✅ 2 nuevas IAs (Meta AI, Tess AI)
- ✅ Códigos de curso de 16 dígitos
- ✅ Unirse a curso con código

---

## ⚠️ LO QUE FALTA (en index.html)

### 1. Botón "Cambiar Cuenta" en Sidebar
Agregar ANTES del botón de Configuración:

```html
<div class="sidebar-item" id="sidebar-switch-account" title="Cambiar Cuenta">
  <span class="sidebar-icon">🔄</span>
  <span class="sidebar-text">Cambiar Cuenta</span>
</div>
```

### 2. Modal de Cambiar Cuenta
Agregar ANTES de `</body>`:

```html
<!-- Modal Cambiar Cuenta -->
<div id="switch-account-modal" class="modal">
  <div class="modal-content">
    <h2>🔄 Cambiar de Cuenta</h2>
    <form id="switch-account-form" class="auth-form">
      <div class="form-group">
        <label>PIN de tu cuenta actual</label>
        <input type="password" id="switch-current-pin" required pattern="[0-9]{4,16}">
      </div>
      <div class="form-group">
        <label>Nombre de usuario de la otra cuenta</label>
        <input type="text" id="switch-target-username" required placeholder="@usuario">
      </div>
      <div class="form-group">
        <label>PIN de la otra cuenta</label>
        <input type="password" id="switch-target-pin" required pattern="[0-9]{4,16}">
      </div>
      <div style="display: flex; gap: 12px;">
        <button type="submit" class="btn btn-primary">Cambiar</button>
        <button type="button" class="modal-close btn">Cancelar</button>
      </div>
      <div class="form-error" id="switch-error"></div>
    </form>
  </div>
</div>
```

### 3. Agregar JavaScript para Cambiar Cuenta
En `app.js`, agregar:

```javascript
// Cambiar cuenta
document.getElementById('sidebar-switch-account')?.addEventListener('click', () => {
  document.getElementById('switch-account-modal').style.display = 'flex';
});

document.getElementById('switch-account-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errorDiv = document.getElementById('switch-error');
  
  const credentials = {
    currentPIN: document.getElementById('switch-current-pin').value,
    targetUsername: document.getElementById('switch-target-username').value,
    targetPIN: document.getElementById('switch-target-pin').value
  };

  const result = await window.slStudio.switchAccount(credentials);
  
  if (result.success) {
    alert('✅ Cuenta cambiada correctamente');
    location.reload();
  } else {
    errorDiv.textContent = result.error;
    errorDiv.classList.add('show');
  }
});
```

### 4. Actualizar Vista de Configuración

En la sección de **Cuenta** (busca `<h2 style="margin-bottom: 20px; color: var(--primary-color);">👤 Cuenta</h2>`), reemplaza TODO ese bloque con:

```html
<!-- Cuenta -->
<div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
  <h2 style="margin-bottom: 20px; color: var(--primary-color);">👤 Cuenta</h2>
  
  <!-- Información actual -->
  <div style="color: var(--text-secondary); margin-bottom: 20px;">
    <div style="margin-bottom: 12px;">
      <strong style="color: var(--text-primary);">Nombre de usuario:</strong> <span id="settings-username"></span>
    </div>
    <div style="margin-bottom: 12px;">
      <strong style="color: var(--text-primary);">Correo:</strong> <span id="settings-email"></span>
    </div>
    <div style="margin-bottom: 12px;">
      <strong style="color: var(--text-primary);">Nombre completo:</strong> <span id="settings-fullname"></span>
    </div>
    <div style="margin-bottom: 12px;">
      <strong style="color: var(--text-primary);">Nickname:</strong> <span id="settings-nickname"></span>
    </div>
    <div style="margin-bottom: 12px;">
      <strong style="color: var(--text-primary);">Teléfono:</strong> <span id="settings-phone"></span>
    </div>
    <div style="margin-bottom: 12px;">
      <strong style="color: var(--text-primary);">RUT:</strong> <span id="settings-rut"></span>
    </div>
    <div style="margin-bottom: 12px;">
      <strong style="color: var(--text-primary);">Número de Documento:</strong> <span id="settings-numero-documento"></span>
    </div>
  </div>

  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <button id="edit-profile-btn" class="btn btn-primary">✏️ Editar Datos</button>
    <button id="change-password-btn" class="btn" style="background: var(--bg-tertiary);">🔒 Cambiar Contraseña</button>
    <button id="change-pin-btn" class="btn" style="background: var(--bg-tertiary);">🔑 Cambiar PIN</button>
    <button onclick="logout()" class="btn" style="background: var(--error); color: white;">Cerrar Sesión</button>
  </div>

  <!-- Formulario de edición (oculto por defecto) -->
  <div id="edit-profile-form" style="display: none; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-color);">
    <h3 style="margin-bottom: 16px; color: var(--text-primary);">Editar Información</h3>
    <form id="profile-form" class="auth-form">
      <div class="form-row">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" id="edit-nombre" required>
        </div>
        <div class="form-group">
          <label>Apellido</label>
          <input type="text" id="edit-apellido" required>
        </div>
      </div>
      <div class="form-group">
        <label>Nickname</label>
        <input type="text" id="edit-nickname" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Teléfono (opcional)</label>
          <input type="tel" id="edit-telefono" placeholder="+56 9 1234 5678">
        </div>
        <div class="form-group">
          <label>RUT (opcional)</label>
          <input type="text" id="edit-rut" placeholder="12.345.678-9">
        </div>
      </div>
      <div class="form-group">
        <label>Número de Documento (opcional)</label>
        <input type="text" id="edit-numero-documento" placeholder="123456789">
      </div>
      <div class="form-group">
        <label>Correo electrónico</label>
        <input type="email" id="edit-email" required>
      </div>
      <div style="display: flex; gap: 12px;">
        <button type="submit" class="btn btn-primary">💾 Guardar Cambios</button>
        <button type="button" id="cancel-edit-btn" class="btn" style="background: var(--bg-tertiary);">❌ Cancelar</button>
      </div>
      <div class="form-error" id="edit-error"></div>
    </form>
  </div>
</div>
```

### 5. Actualizar Courses.js

Agregar botón y funcionalidad para unirse a curso. Agregar al inicio del archivo:

```javascript
// Unirse a curso con código
document.getElementById('join-course-btn')?.addEventListener('click', () => {
  const codigo = prompt('Ingresa el código del curso (16 dígitos):');
  if (!codigo) return;

  window.slStudio.joinCourse(codigo).then(result => {
    if (result.success) {
      alert(`✅ Te has unido al curso: ${result.data.courseName}`);
      loadCourses(); // Recargar lista de cursos
    } else {
      alert(`❌ Error: ${result.error}`);
    }
  });
});
```

Y agregar el botón en la vista de cursos (en index.html):

```html
<button id="join-course-btn" class="btn btn-primary" style="margin-left: 12px;">
  ➕ Unirse a Curso
</button>
```

---

## 🚀 CÓMO USAR

### 1. Descomprime el ZIP

### 2. Instala Dependencias
```powershell
cd D:\Downloads\sl-studio-v2.1.0-complete
npm install
```

### 3. Prueba la App
```powershell
npm start
```

### 4. Prueba las Nuevas Funcionalidades

**Registrarse:**
- Llenar todos los campos incluido "Número de Documento"
- El registro funciona ✅

**Editar Perfil:**
- Ve a Configuración
- Click en "✏️ Editar Datos"
- Modifica lo que quieras
- Guarda cambios ✅

**Cambiar Contraseña/PIN:**
- Ve a Configuración
- Click en "🔒 Cambiar Contraseña" o "🔑 Cambiar PIN"
- Funciona con prompts ✅

**Crear Curso:**
- Ve a Cursos
- Click en "+ Crear Curso"
- Se genera código de 16 dígitos automático ✅

**Colores Nuevos:**
- Ve a Configuración > Personalización
- Los últimos 3 colores son los nuevos ✅

### 5. Actualizar GitHub

```powershell
cd D:\Downloads\sl-studio-v2.1.0-complete
git init
git remote add origin https://github.com/andysitostudio/Sl_Studios-releases.git
git fetch origin main
git reset --hard origin/main
git add .
git commit -m "feat: actualización completa v2.1.0 - nuevas apps, colores, edición de perfil"
git branch -M main
git push -f origin main
```

---

## 📝 NOTAS FINALES

- Las apps abren en navegador externo (por ahora)
- El chat será en v2.3.0 con Firebase
- Las pestañas integradas serán en v2.1.1

¡Prueba todo y avísame si algo no funciona!
