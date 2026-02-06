const { contextBridge, ipcRenderer } = require('electron');

// Exponer APIs de forma segura al renderer process
contextBridge.exposeInMainWorld('slStudio', {
  // Controles de ventana
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),

  // Autenticación
  register: (userData) => ipcRenderer.invoke('register-user', userData),
  login: (credentials) => ipcRenderer.invoke('login-user', credentials),
  checkSession: () => ipcRenderer.invoke('check-session'),
  logout: () => ipcRenderer.invoke('logout'),

  // Configuración
  getSettings: () => ipcRenderer.invoke('get-settings'),
  updateSettings: (settings) => ipcRenderer.invoke('update-settings', settings),

  // Horarios
  addSchedule: (scheduleData) => ipcRenderer.invoke('add-schedule', scheduleData),
  getSchedules: () => ipcRenderer.invoke('get-schedules'),
  deleteSchedule: (scheduleId) => ipcRenderer.invoke('delete-schedule', scheduleId),

  // Cursos
  createCourse: (courseData) => ipcRenderer.invoke('create-course', courseData),
  getCourses: () => ipcRenderer.invoke('get-courses'),

  // Abrir enlaces externos
  openExternal: (url) => {
    require('electron').shell.openExternal(url);
  },

  // Sistema de actualizaciones
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (event, percent) => callback(percent))
});
