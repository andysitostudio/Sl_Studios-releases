const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class SlStudioDatabase {
  constructor(userDataPath) {
    const dbPath = path.join(userDataPath, 'slstudio.db');
    this.db = new Database(dbPath);
    this.initDatabase();
  }

  initDatabase() {
    // Tabla de usuarios
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        nickname TEXT NOT NULL,
        telefono TEXT,
        rut TEXT,
        email TEXT UNIQUE NOT NULL,
        pin TEXT NOT NULL,
        password TEXT NOT NULL,
        nivel_educativo TEXT NOT NULL,
        curso TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de sesiones
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Tabla de configuración
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        theme_color TEXT DEFAULT 'electric-blue',
        background_mode TEXT DEFAULT 'dark',
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Tabla de horarios/pruebas
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        course_id INTEGER,
        tipo TEXT NOT NULL,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        fecha DATE NOT NULL,
        hora_inicio TIME,
        hora_fin TIME,
        prioridad TEXT DEFAULT 'media',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
      )
    `);

    // Tabla de cursos/grupos
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        codigo TEXT UNIQUE NOT NULL,
        creator_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (creator_id) REFERENCES users(id)
      )
    `);

    // Tabla de miembros de curso
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS course_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(course_id, user_id)
      )
    `);
  }

  // Registrar nuevo usuario
  registerUser(userData) {
    const {
      nombre,
      apellido,
      username,
      nickname,
      telefono,
      rut,
      email,
      pin,
      password,
      nivelEducativo,
      curso
    } = userData;

    // Validar que el username no exista
    const existingUser = this.db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existingUser) {
      throw new Error('El nombre de usuario ya está en uso');
    }

    // Validar que el email no exista
    const existingEmail = this.db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingEmail) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Hashear PIN y contraseña
    const hashedPin = bcrypt.hashSync(pin, 10);
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insertar usuario
    const insert = this.db.prepare(`
      INSERT INTO users (nombre, apellido, username, nickname, telefono, rut, email, pin, password, nivel_educativo, curso)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      nombre,
      apellido,
      username,
      nickname,
      telefono || null,
      rut || null,
      email,
      hashedPin,
      hashedPassword,
      nivelEducativo,
      curso
    );

    // Crear configuración por defecto
    this.db.prepare('INSERT INTO settings (user_id) VALUES (?)').run(result.lastInsertRowid);

    return {
      id: result.lastInsertRowid,
      username,
      email
    };
  }

  // Iniciar sesión
  loginUser(credentials) {
    const { username, password, pin } = credentials;

    const user = this.db.prepare(`
      SELECT id, username, email, password, pin, nombre, apellido, nickname
      FROM users
      WHERE username = ?
    `).get(username);

    if (!user) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Verificar contraseña
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Verificar PIN
    if (!bcrypt.compareSync(pin, user.pin)) {
      throw new Error('PIN incorrecto');
    }

    // Crear token de sesión
    const token = crypto.randomBytes(32).toString('hex');

    // Eliminar sesiones anteriores del usuario
    this.db.prepare('DELETE FROM sessions WHERE user_id = ?').run(user.id);

    // Crear nueva sesión
    this.db.prepare('INSERT INTO sessions (user_id, token) VALUES (?, ?)').run(user.id, token);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      nickname: user.nickname,
      token
    };
  }

  // Verificar sesión activa
  getActiveSession() {
    const session = this.db.prepare(`
      SELECT s.token, u.id, u.username, u.email, u.nombre, u.apellido, u.nickname
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC
      LIMIT 1
    `).get();

    return session || null;
  }

  // Cerrar sesión
  clearSession() {
    this.db.prepare('DELETE FROM sessions').run();
  }

  // Obtener configuración
  getSettings() {
    const session = this.getActiveSession();
    if (!session) {
      throw new Error('No hay sesión activa');
    }

    const settings = this.db.prepare(`
      SELECT theme_color, background_mode
      FROM settings
      WHERE user_id = ?
    `).get(session.id);

    return settings || { theme_color: 'electric-blue', background_mode: 'dark' };
  }

  // Actualizar configuración
  updateSettings(settings) {
    const session = this.getActiveSession();
    if (!session) {
      throw new Error('No hay sesión activa');
    }

    this.db.prepare(`
      UPDATE settings
      SET theme_color = ?, background_mode = ?
      WHERE user_id = ?
    `).run(settings.themeColor, settings.backgroundMode, session.id);
  }

  // Agregar horario/prueba
  addSchedule(scheduleData) {
    const session = this.getActiveSession();
    if (!session) {
      throw new Error('No hay sesión activa');
    }

    const insert = this.db.prepare(`
      INSERT INTO schedules (user_id, course_id, tipo, titulo, descripcion, fecha, hora_inicio, hora_fin, prioridad)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      session.id,
      scheduleData.courseId || null,
      scheduleData.tipo,
      scheduleData.titulo,
      scheduleData.descripcion || null,
      scheduleData.fecha,
      scheduleData.horaInicio || null,
      scheduleData.horaFin || null,
      scheduleData.prioridad || 'media'
    );

    return { id: result.lastInsertRowid };
  }

  // Obtener horarios
  getSchedules() {
    const session = this.getActiveSession();
    if (!session) {
      throw new Error('No hay sesión activa');
    }

    return this.db.prepare(`
      SELECT s.*, c.nombre as course_name
      FROM schedules s
      LEFT JOIN courses c ON s.course_id = c.id
      WHERE s.user_id = ?
      ORDER BY s.fecha ASC, s.hora_inicio ASC
    `).all(session.id);
  }

  // Eliminar horario
  deleteSchedule(scheduleId) {
    const session = this.getActiveSession();
    if (!session) {
      throw new Error('No hay sesión activa');
    }

    this.db.prepare('DELETE FROM schedules WHERE id = ? AND user_id = ?').run(scheduleId, session.id);
  }

  // Crear curso/grupo
  createCourse(courseData) {
    const session = this.getActiveSession();
    if (!session) {
      throw new Error('No hay sesión activa');
    }

    const codigo = crypto.randomBytes(4).toString('hex').toUpperCase();

    const insert = this.db.prepare(`
      INSERT INTO courses (nombre, descripcion, codigo, creator_id)
      VALUES (?, ?, ?, ?)
    `);

    const result = insert.run(
      courseData.nombre,
      courseData.descripcion || null,
      codigo,
      session.id
    );

    // Agregar al creador como miembro
    this.db.prepare('INSERT INTO course_members (course_id, user_id) VALUES (?, ?)').run(
      result.lastInsertRowid,
      session.id
    );

    return {
      id: result.lastInsertRowid,
      codigo
    };
  }

  // Obtener cursos del usuario
  getCourses() {
    const session = this.getActiveSession();
    if (!session) {
      throw new Error('No hay sesión activa');
    }

    return this.db.prepare(`
      SELECT c.*, u.username as creator_username
      FROM courses c
      JOIN course_members cm ON c.id = cm.course_id
      JOIN users u ON c.creator_id = u.id
      WHERE cm.user_id = ?
      ORDER BY c.created_at DESC
    `).all(session.id);
  }

  close() {
    this.db.close();
  }
}

module.exports = SlStudioDatabase;
