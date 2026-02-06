# 🚀 GUÍA DE ACTUALIZACIÓN: Sl Studio v2.1.0

## 📋 Cambios Incluidos

### ✨ Nuevas Características:
1. ✅ Edición completa de datos personales
2. ✅ Cambio rápido de cuenta (con PIN)
3. ✅ 3 Nuevas IAs: Gemini, Meta AI, Tess AI
4. ✅ 6 Nuevas aplicaciones
5. ✅ 3 Colores nuevos
6. ✅ Campo "Número de documento"
7. ✅ Códigos de curso de 16 dígitos
8. ✅ Unirse a cursos con código

---

## 📝 PASO 1: Actualizar Base de Datos (db.js)

### 1.1 Agregar campo numero_documento

Abre `src/database/db.js` y busca la línea 49 que dice:
```javascript
rut TEXT,
```

Después de esa línea, agrega:
```javascript
numero_documento TEXT,
```

### 1.2 Actualizar método registerUser

Busca la función `registerUser` (línea ~115) y modifica:

**ANTES:**
```javascript
const {
  nombre, apellido, username, nickname,
  telefono, rut, email, pin, password,
  nivelEducativo, curso
} = userData;
```

**DESPUÉS:**
```javascript
const {
  nombre, apellido, username, nickname,
  telefono, rut, numeroDocumento, email,
  pin, password, nivelEducativo, curso
} = userData;
```

Luego busca la línea del INSERT (aproximadamente línea 130):

**ANTES:**
```javascript
this.db.run(`INSERT INTO users (nombre, apellido, username, nickname, telefono, rut, email, pin, password, nivel_educativo, curso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [nombre, apellido, username, nickname, telefono || null, rut || null, email, hashedPin, hashedPassword, nivelEducativo, curso]);
```

**DESPUÉS:**
```javascript
this.db.run(`INSERT INTO users (nombre, apellido, username, nickname, telefono, rut, numero_documento, email, pin, password, nivel_educativo, curso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [nombre, apellido, username, nickname, telefono || null, rut || null, numeroDocumento || null, email, hashedPin, hashedPassword, nivelEducativo, curso]);
```

### 1.3 Agregar nuevos métodos al FINAL del archivo (antes de `close()`)

```javascript
  // Actualizar datos de usuario
  updateUserData(userData) {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');

    const { nombre, apellido, nickname, telefono, rut, numeroDocumento, email } = userData;

    // Validar que el email no esté en uso por otro usuario
    if (email && email !== session.email) {
      const existingEmail = this.db.exec('SELECT id FROM users WHERE email = ? AND id != ?', [email, session.id]);
      if (existingEmail.length > 0 && existingEmail[0].values.length > 0) {
        throw new Error('El correo electrónico ya está en uso');
      }
    }

    // Construir query dinámico
    const updates = [];
    const values = [];

    if (nombre) { updates.push('nombre = ?'); values.push(nombre); }
    if (apellido) { updates.push('apellido = ?'); values.push(apellido); }
    if (nickname) { updates.push('nickname = ?'); values.push(nickname); }
    if (telefono !== undefined) { updates.push('telefono = ?'); values.push(telefono || null); }
    if (rut !== undefined) { updates.push('rut = ?'); values.push(rut || null); }
    if (numeroDocumento !== undefined) { updates.push('numero_documento = ?'); values.push(numeroDocumento || null); }
    if (email) { updates.push('email = ?'); values.push(email); }

    if (updates.length === 0) {
      throw new Error('No hay datos para actualizar');
    }

    values.push(session.id);
    this.db.run(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);
    this.save();

    return { success: true };
  }

  // Cambiar contraseña
  changePassword(passwordData) {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');

    const { currentPassword, newPassword } = passwordData;

    const result = this.db.exec('SELECT password FROM users WHERE id = ?', [session.id]);
    if (result.length === 0 || result[0].values.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const currentHash = result[0].values[0][0];

    if (!bcrypt.compareSync(currentPassword, currentHash)) {
      throw new Error('La contraseña actual es incorrecta');
    }

    const newHash = bcrypt.hashSync(newPassword, 10);

    this.db.run('UPDATE users SET password = ? WHERE id = ?', [newHash, session.id]);
    this.save();

    return { success: true };
  }

  // Cambiar PIN
  changePIN(pinData) {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');

    const { currentPIN, newPIN } = pinData;

    const result = this.db.exec('SELECT pin FROM users WHERE id = ?', [session.id]);
    if (result.length === 0 || result[0].values.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const currentHash = result[0].values[0][0];

    if (!bcrypt.compareSync(currentPIN, currentHash)) {
      throw new Error('El PIN actual es incorrecto');
    }

    const newHash = bcrypt.hashSync(newPIN, 10);

    this.db.run('UPDATE users SET pin = ? WHERE id = ?', [newHash, session.id]);
    this.save();

    return { success: true };
  }

  // Obtener usuario por username (para cambio de cuenta)
  getUserByUsername(username) {
    const result = this.db.exec(`SELECT id, username, nombre, apellido, nickname, pin FROM users WHERE username = ?`, [username]);
    if (result.length === 0 || result[0].values.length === 0) return null;
    const row = result[0].values[0];
    return { id: row[0], username: row[1], nombre: row[2], apellido: row[3], nickname: row[4], pin: row[5] };
  }

  // Cambiar a otra cuenta
  switchAccount(credentials) {
    const { currentPIN, targetUsername, targetPIN } = credentials;

    // Verificar PIN actual
    const currentSession = this.getActiveSession();
    if (currentSession) {
      const currentUser = this.db.exec('SELECT pin FROM users WHERE id = ?', [currentSession.id]);
      if (currentUser.length > 0 && currentUser[0].values.length > 0) {
        if (!bcrypt.compareSync(currentPIN, currentUser[0].values[0][0])) {
          throw new Error('PIN actual incorrecto');
        }
      }
    }

    // Buscar usuario objetivo
    const targetUser = this.getUserByUsername(targetUsername);
    if (!targetUser) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar PIN del usuario objetivo
    if (!bcrypt.compareSync(targetPIN, targetUser.pin)) {
      throw new Error('PIN del usuario objetivo incorrecto');
    }

    // Eliminar sesión actual
    this.clearSession();

    // Crear nueva sesión
    const token = crypto.randomBytes(32).toString('hex');
    this.db.run('INSERT INTO sessions (user_id, token) VALUES (?, ?)', [targetUser.id, token]);
    this.save();

    return {
      id: targetUser.id,
      username: targetUser.username,
      nombre: targetUser.nombre,
      apellido: targetUser.apellido,
      nickname: targetUser.nickname,
      token
    };
  }

  // Unirse a un curso con código
  joinCourse(codigo) {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');

    // Buscar curso
    const result = this.db.exec('SELECT id, nombre FROM courses WHERE codigo = ?', [codigo]);
    if (result.length === 0 || result[0].values.length === 0) {
      throw new Error('Código de curso inválido');
    }

    const courseId = result[0].values[0][0];
    const courseName = result[0].values[0][1];

    // Verificar si ya es miembro
    const existing = this.db.exec('SELECT id FROM course_members WHERE course_id = ? AND user_id = ?', [courseId, session.id]);
    if (existing.length > 0 && existing[0].values.length > 0) {
      throw new Error('Ya eres miembro de este curso');
    }

    // Agregar como miembro
    this.db.run('INSERT INTO course_members (course_id, user_id) VALUES (?, ?)', [courseId, session.id]);
    this.save();

    return { success: true, courseName };
  }
```

### 1.4 Modificar createCourse para generar código de 16 dígitos

Busca el método `createCourse` (alrededor de línea 260) y reemplaza:

**ANTES:**
```javascript
const codigo = crypto.randomBytes(4).toString('hex').toUpperCase();
```

**DESPUÉS:**
```javascript
// Generar código de 16 caracteres: Zx7?-82Pa-@?#O-QW=5
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#?$%&*=-';
let codigo = '';
for (let i = 0; i < 16; i++) {
  if (i > 0 && i % 4 === 0) codigo += '-';
  codigo += chars.charAt(Math.floor(Math.random() * chars.length));
}
```

---

## 📝 PASO 2: Actualizar main.js

Abre `src/main.js` y agrega estos handlers DESPUÉS de los existentes (antes del comentario "// Prevenir navegación"):

```javascript
// Actualizar datos de usuario
ipcMain.handle('update-user-data', async (event, userData) => {
  try {
    await db.init();
    const result = db.updateUserData(userData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Cambiar contraseña
ipcMain.handle('change-password', async (event, passwordData) => {
  try {
    await db.init();
    const result = db.changePassword(passwordData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Cambiar PIN
ipcMain.handle('change-pin', async (event, pinData) => {
  try {
    await db.init();
    const result = db.changePIN(pinData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Cambiar de cuenta
ipcMain.handle('switch-account', async (event, credentials) => {
  try {
    await db.init();
    const result = db.switchAccount(credentials);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Unirse a curso
ipcMain.handle('join-course', async (event, codigo) => {
  try {
    await db.init();
    const result = db.joinCourse(codigo);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
```

---

## 📝 PASO 3: Actualizar preload.js

Abre `src/preload.js` y agrega estas líneas en el objeto `slStudio` (después de las existentes):

```javascript
  // Gestión de cuenta (AGREGAR ANTES de la última llave)
  updateUserData: (userData) => ipcRenderer.invoke('update-user-data', userData),
  changePassword: (passwordData) => ipcRenderer.invoke('change-password', passwordData),
  changePIN: (pinData) => ipcRenderer.invoke('change-pin', pinData),
  switchAccount: (credentials) => ipcRenderer.invoke('switch-account', credentials),
  joinCourse: (codigo) => ipcRenderer.invoke('join-course', codigo),
```

---

## 📝 PASO 4: Actualizar Formulario de Registro (auth.js)

Abre `src/renderer/js/auth.js` y busca el formulario de registro.

Agrega el campo de número de documento DESPUÉS del campo RUT (alrededor de línea 70-80):

```javascript
const rut = document.getElementById('reg-rut').value;
const numeroDocumento = document.getElementById('reg-numero-documento').value; // NUEVA LÍNEA
const email = document.getElementById('reg-email').value;
```

Y en el objeto userData:

```javascript
const userData = {
  nombre,
  apellido,
  username,
  nickname,
  telefono,
  rut,
  numeroDocumento, // NUEVA LÍNEA
  email,
  pin,
  password,
  nivelEducativo,
  curso
};
```

---

## 📝 PASO 5: Actualizar HTML del Registro (index.html)

Abre `src/renderer/index.html` y busca el formulario de registro.

DESPUÉS del campo RUT (alrededor línea 140), agrega:

```html
<div class="form-group">
  <label for="reg-numero-documento">Número de Documento (opcional)</label>
  <input type="text" id="reg-numero-documento" placeholder="123456789">
</div>
```

---

## 📝 PASO 6: Agregar Nuevas Aplicaciones (apps-data.js)

Abre `src/renderer/js/apps-data.js` y agrega las nuevas apps:

En el array `extras`, agrega:

```javascript
{ name: 'Canva', icon: '🎨', url: 'https://www.canva.com' },
{ name: 'Visual Studio', icon: '💻', url: 'https://code.visualstudio.com' },
{ name: 'Code.org', icon: '🧑‍💻', url: 'https://code.org' },
{ name: 'Scratch', icon: '🐱', url: 'https://scratch.mit.edu' },
{ name: 'Notion', icon: '📝', url: 'https://www.notion.so' },
{ name: 'Calculadora', icon: '🔢', url: 'https://www.calculator.net' }
```

En el array `ai`, ya tienes algunas IAs, agrega:

```javascript
{ name: 'Meta AI', icon: '🤖', url: 'https://www.meta.ai' },
{ name: 'Tess AI', icon: '💬', url: 'https://www.tessai.com' }
```

Nota: Gemini ya está en la lista de Google.

---

## 📝 PASO 7: Agregar Nuevos Colores (themes.css)

Abre `src/renderer/styles/themes.css` y agrega al FINAL:

```css
/* Azul Oscuro */
.theme-dark-blue {
  --primary-color: #1e3a8a;
}

/* Rosado Claro */
.theme-light-pink {
  --primary-color: #ffc0cb;
}

/* Rosado Suave */
.theme-soft-pink {
  --primary-color: #ffb6c1;
}
```

Y en la lista de colores en `settings.js`, agrega:

```javascript
{ id: 'dark-blue', name: 'Azul Oscuro' },
{ id: 'light-pink', name: 'Rosado Claro' },
{ id: 'soft-pink', name: 'Rosado Suave' }
```

---

Esta es la PRIMERA PARTE de la actualización. ¿Quieres que continúe con los archivos específicos completos o prefieres que te cree un archivo por archivo actualizado?

La siguiente parte incluirá:
- Botón de cambio de cuenta en el sidebar
- Formulario de edición de perfil completo
- Modal para unirse a curso

¿Seguimos?
