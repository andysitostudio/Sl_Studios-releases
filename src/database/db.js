const initSqlJs = require('sql.js');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');

class SlStudioDatabase {
  constructor(userDataPath) {
    this.dbPath = path.join(userDataPath, 'slstudio.db');
    this.db = null;
    this.SQL = null;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    this.SQL = await initSqlJs();
    
    if (fs.existsSync(this.dbPath)) {
      const buffer = fs.readFileSync(this.dbPath);
      this.db = new this.SQL.Database(buffer);
    } else {
      this.db = new this.SQL.Database();
      this.initDatabase();
      this.save();
    }

    this.initialized = true;
  }

  save() {
    const data = this.db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(this.dbPath, buffer);
  }

  initDatabase() {
    this.db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, apellido TEXT NOT NULL, username TEXT UNIQUE NOT NULL, nickname TEXT NOT NULL, telefono TEXT, rut TEXT, email TEXT UNIQUE NOT NULL, pin TEXT NOT NULL, password TEXT NOT NULL, nivel_educativo TEXT NOT NULL, curso TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    this.db.run(`CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, token TEXT UNIQUE NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id))`);
    this.db.run(`CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, theme_color TEXT DEFAULT 'electric-blue', background_mode TEXT DEFAULT 'dark', FOREIGN KEY (user_id) REFERENCES users(id))`);
    this.db.run(`CREATE TABLE IF NOT EXISTS schedules (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, course_id INTEGER, tipo TEXT NOT NULL, titulo TEXT NOT NULL, descripcion TEXT, fecha DATE NOT NULL, hora_inicio TIME, hora_fin TIME, prioridad TEXT DEFAULT 'media', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (course_id) REFERENCES courses(id))`);
    this.db.run(`CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, descripcion TEXT, codigo TEXT UNIQUE NOT NULL, creator_id INTEGER NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (creator_id) REFERENCES users(id))`);
    this.db.run(`CREATE TABLE IF NOT EXISTS course_members (id INTEGER PRIMARY KEY AUTOINCREMENT, course_id INTEGER NOT NULL, user_id INTEGER NOT NULL, joined_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (course_id) REFERENCES courses(id), FOREIGN KEY (user_id) REFERENCES users(id), UNIQUE(course_id, user_id))`);
    this.save();
  }

  registerUser(userData) {
    const { nombre, apellido, username, nickname, telefono, rut, email, pin, password, nivelEducativo, curso } = userData;
    const existingUser = this.db.exec('SELECT id FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0 && existingUser[0].values.length > 0) throw new Error('El nombre de usuario ya está en uso');
    const existingEmail = this.db.exec('SELECT id FROM users WHERE email = ?', [email]);
    if (existingEmail.length > 0 && existingEmail[0].values.length > 0) throw new Error('El correo electrónico ya está registrado');
    const hashedPin = bcrypt.hashSync(pin, 10);
    const hashedPassword = bcrypt.hashSync(password, 10);
    this.db.run(`INSERT INTO users (nombre, apellido, username, nickname, telefono, rut, email, pin, password, nivel_educativo, curso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [nombre, apellido, username, nickname, telefono || null, rut || null, email, hashedPin, hashedPassword, nivelEducativo, curso]);
    const result = this.db.exec('SELECT last_insert_rowid() as id');
    const userId = result[0].values[0][0];
    this.db.run('INSERT INTO settings (user_id) VALUES (?)', [userId]);
    this.save();
    return { id: userId, username, email };
  }

  loginUser(credentials) {
    const { username, password, pin } = credentials;
    const result = this.db.exec(`SELECT id, username, email, password, pin, nombre, apellido, nickname FROM users WHERE username = ?`, [username]);
    if (result.length === 0 || result[0].values.length === 0) throw new Error('Usuario o contraseña incorrectos');
    const row = result[0].values[0];
    const user = { id: row[0], username: row[1], email: row[2], password: row[3], pin: row[4], nombre: row[5], apellido: row[6], nickname: row[7] };
    if (!bcrypt.compareSync(password, user.password)) throw new Error('Usuario o contraseña incorrectos');
    if (!bcrypt.compareSync(pin, user.pin)) throw new Error('PIN incorrecto');
    const token = crypto.randomBytes(32).toString('hex');
    this.db.run('DELETE FROM sessions WHERE user_id = ?', [user.id]);
    this.db.run('INSERT INTO sessions (user_id, token) VALUES (?, ?)', [user.id, token]);
    this.save();
    return { id: user.id, username: user.username, email: user.email, nombre: user.nombre, apellido: user.apellido, nickname: user.nickname, token };
  }

  getActiveSession() {
    const result = this.db.exec(`SELECT s.token, u.id, u.username, u.email, u.nombre, u.apellido, u.nickname FROM sessions s JOIN users u ON s.user_id = u.id ORDER BY s.created_at DESC LIMIT 1`);
    if (result.length === 0 || result[0].values.length === 0) return null;
    const row = result[0].values[0];
    return { token: row[0], id: row[1], username: row[2], email: row[3], nombre: row[4], apellido: row[5], nickname: row[6] };
  }

  clearSession() {
    this.db.run('DELETE FROM sessions');
    this.save();
  }

  getSettings() {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');
    const result = this.db.exec(`SELECT theme_color, background_mode FROM settings WHERE user_id = ?`, [session.id]);
    if (result.length === 0 || result[0].values.length === 0) return { theme_color: 'electric-blue', background_mode: 'dark' };
    const row = result[0].values[0];
    return { theme_color: row[0], background_mode: row[1] };
  }

  updateSettings(settings) {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');
    this.db.run(`UPDATE settings SET theme_color = ?, background_mode = ? WHERE user_id = ?`, [settings.themeColor, settings.backgroundMode, session.id]);
    this.save();
  }

  addSchedule(scheduleData) {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');
    this.db.run(`INSERT INTO schedules (user_id, course_id, tipo, titulo, descripcion, fecha, hora_inicio, hora_fin, prioridad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [session.id, scheduleData.courseId || null, scheduleData.tipo, scheduleData.titulo, scheduleData.descripcion || null, scheduleData.fecha, scheduleData.horaInicio || null, scheduleData.horaFin || null, scheduleData.prioridad || 'media']);
    const result = this.db.exec('SELECT last_insert_rowid() as id');
    const scheduleId = result[0].values[0][0];
    this.save();
    return { id: scheduleId };
  }

  getSchedules() {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');
    const result = this.db.exec(`SELECT s.id, s.tipo, s.titulo, s.descripcion, s.fecha, s.hora_inicio, s.hora_fin, s.prioridad, c.nombre as course_name FROM schedules s LEFT JOIN courses c ON s.course_id = c.id WHERE s.user_id = ? ORDER BY s.fecha ASC, s.hora_inicio ASC`, [session.id]);
    if (result.length === 0 || result[0].values.length === 0) return [];
    return result[0].values.map(row => ({ id: row[0], tipo: row[1], titulo: row[2], descripcion: row[3], fecha: row[4], hora_inicio: row[5], hora_fin: row[6], prioridad: row[7], course_name: row[8] }));
  }

  deleteSchedule(scheduleId) {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');
    this.db.run('DELETE FROM schedules WHERE id = ? AND user_id = ?', [scheduleId, session.id]);
    this.save();
  }

  createCourse(courseData) {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');
    const codigo = crypto.randomBytes(4).toString('hex').toUpperCase();
    this.db.run(`INSERT INTO courses (nombre, descripcion, codigo, creator_id) VALUES (?, ?, ?, ?)`, [courseData.nombre, courseData.descripcion || null, codigo, session.id]);
    const result = this.db.exec('SELECT last_insert_rowid() as id');
    const courseId = result[0].values[0][0];
    this.db.run('INSERT INTO course_members (course_id, user_id) VALUES (?, ?)', [courseId, session.id]);
    this.save();
    return { id: courseId, codigo };
  }

  getCourses() {
    const session = this.getActiveSession();
    if (!session) throw new Error('No hay sesión activa');
    const result = this.db.exec(`SELECT c.id, c.nombre, c.descripcion, c.codigo, c.created_at, u.username as creator_username FROM courses c JOIN course_members cm ON c.id = cm.course_id JOIN users u ON c.creator_id = u.id WHERE cm.user_id = ? ORDER BY c.created_at DESC`, [session.id]);
    if (result.length === 0 || result[0].values.length === 0) return [];
    return result[0].values.map(row => ({ id: row[0], nombre: row[1], descripcion: row[2], codigo: row[3], created_at: row[4], creator_username: row[5] }));
  }

  close() {
    if (this.db) {
      this.save();
      this.db.close();
    }
  }
}

module.exports = SlStudioDatabase;