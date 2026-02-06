const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const Database = require('./database/db');
const fs = require('fs');
const { autoUpdater } = require('electron-updater');

// Deshabilitar aceleración de hardware para mejor compatibilidad
app.disableHardwareAcceleration();

let mainWindow;
let db;

// Configuración de seguridad para evitar modificaciones
const isDev = process.argv.includes('--dev');

// Configuración del auto-updater
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// Logs del updater
autoUpdater.logger = require('electron-log');
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

// Eventos del auto-updater
autoUpdater.on('checking-for-update', () => {
  console.log('Verificando actualizaciones...');
});

autoUpdater.on('update-available', (info) => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Actualización disponible',
    message: `Hay una nueva versión disponible: ${info.version}`,
    buttons: ['Descargar', 'Más tarde'],
    defaultId: 0
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
});

autoUpdater.on('update-not-available', () => {
  console.log('No hay actualizaciones disponibles');
});

autoUpdater.on('download-progress', (progressObj) => {
  let message = `Velocidad: ${progressObj.bytesPerSecond} - Descargado: ${progressObj.percent}%`;
  console.log(message);
  if (mainWindow) {
    mainWindow.webContents.send('download-progress', progressObj.percent);
  }
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Actualización lista',
    message: 'La actualización se instalará al cerrar la aplicación.',
    buttons: ['Reiniciar ahora', 'Más tarde'],
    defaultId: 0
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

autoUpdater.on('error', (err) => {
  console.error('Error en actualización:', err);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    frame: false, // Sin barra de título (estilo moderno)
    backgroundColor: '#0a0a0a',
    icon: path.join(__dirname, '../assets/icons/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDev, // Solo en modo desarrollo
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  // Prevenir modificaciones del código
  if (!isDev) {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Inicializar base de datos
app.on('ready', () => {
  const userDataPath = app.getPath('userData');
  db = new Database(userDataPath);
  createWindow();
  
  // Verificar actualizaciones después de 3 segundos
  if (!isDev) {
    setTimeout(() => {
      autoUpdater.checkForUpdates();
    }, 3000);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers - Comunicación segura entre renderer y main

// Controles de ventana
ipcMain.on('window-minimize', () => {
  mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('window-close', () => {
  mainWindow.close();
});

// Registro de usuario
ipcMain.handle('register-user', async (event, userData) => {
  try {
    const result = await db.registerUser(userData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Inicio de sesión
ipcMain.handle('login-user', async (event, credentials) => {
  try {
    const result = await db.loginUser(credentials);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Verificar sesión guardada
ipcMain.handle('check-session', async () => {
  try {
    const session = await db.getActiveSession();
    return { success: true, data: session };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Cerrar sesión
ipcMain.handle('logout', async () => {
  try {
    await db.clearSession();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Obtener configuración del usuario
ipcMain.handle('get-settings', async () => {
  try {
    const settings = await db.getSettings();
    return { success: true, data: settings };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Actualizar configuración
ipcMain.handle('update-settings', async (event, settings) => {
  try {
    await db.updateSettings(settings);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Gestión de horarios
ipcMain.handle('add-schedule', async (event, scheduleData) => {
  try {
    const result = await db.addSchedule(scheduleData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-schedules', async () => {
  try {
    const schedules = await db.getSchedules();
    return { success: true, data: schedules };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-schedule', async (event, scheduleId) => {
  try {
    await db.deleteSchedule(scheduleId);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Gestión de cursos/grupos
ipcMain.handle('create-course', async (event, courseData) => {
  try {
    const result = await db.createCourse(courseData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-courses', async () => {
  try {
    const courses = await db.getCourses();
    return { success: true, data: courses };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Verificar actualizaciones manualmente
ipcMain.handle('check-for-updates', async () => {
  try {
    const result = await autoUpdater.checkForUpdates();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Obtener versión actual
ipcMain.handle('get-app-version', () => {
  return { success: true, version: app.getVersion() };
});

// Prevenir navegación externa no autorizada
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const allowedUrls = [
      'https://www.office.com',
      'https://www.google.com',
      'https://docs.google.com',
      'https://drive.google.com',
      'https://classroom.google.com',
      'https://chat.openai.com',
      'https://claude.ai',
      'https://copilot.microsoft.com'
    ];
    
    const url = new URL(navigationUrl);
    const isAllowed = allowedUrls.some(allowed => url.href.startsWith(allowed));
    
    if (!isAllowed) {
      event.preventDefault();
    }
  });

  contents.setWindowOpenHandler(({ url }) => {
    // Abrir enlaces externos en navegador predeterminado
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });
});
