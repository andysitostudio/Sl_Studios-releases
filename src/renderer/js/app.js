// Archivo principal de Sl Studio

let currentUser = null;

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', async () => {
  // Configurar controles de ventana
  document.getElementById('minimize-btn')?.addEventListener('click', () => {
    window.slStudio.minimizeWindow();
  });

  document.getElementById('maximize-btn')?.addEventListener('click', () => {
    window.slStudio.maximizeWindow();
  });

  document.getElementById('close-btn')?.addEventListener('click', () => {
    window.slStudio.closeWindow();
  });

  // Verificar sesión existente
  setTimeout(async () => {
    const sessionResult = await window.slStudio.checkSession();
    
    document.getElementById('loading-screen').style.display = 'none';

    if (sessionResult.success && sessionResult.data) {
      // Hay sesión activa
      currentUser = sessionResult.data;
      showMainApp(sessionResult.data);
      loadUserSettings();
    } else {
      // No hay sesión, mostrar login
      document.getElementById('login-screen').style.display = 'flex';
    }
  }, 1500);

  // Configurar navegación del sidebar
  document.querySelectorAll('.sidebar-item[data-view]').forEach(item => {
    item.addEventListener('click', () => {
      const viewId = item.getAttribute('data-view');
      switchView(viewId);

      // Actualizar sidebar activo
      document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
});

function switchView(viewId) {
  // Ocultar todas las vistas
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
    view.style.display = 'none';
  });

  // Mostrar vista seleccionada
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.style.display = 'block';
    targetView.classList.add('active');

    // Cargar contenido específico de la vista
    if (viewId === 'schedules') {
      loadSchedulesView();
    } else if (viewId === 'courses') {
      loadCoursesView();
    } else if (viewId === 'settings') {
      loadSettingsView();
    } else if (viewId === 'ai') {
      renderAIApps();
    }
  }
}

async function loadUserSettings() {
  try {
    const result = await window.slStudio.getSettings();
    if (result.success) {
      const settings = result.data;
      applyTheme(settings.theme_color, settings.background_mode);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

function applyTheme(color, mode) {
  const body = document.body;
  
  // Remover clases anteriores
  body.className = body.className.split(' ').filter(c => 
    !c.startsWith('theme-') && !c.startsWith('mode-')
  ).join(' ');

  // Aplicar nuevo tema
  body.classList.add(`theme-${color}`, `mode-${mode}`);
}

// Función para cerrar sesión
async function logout() {
  const confirmed = confirm('¿Estás seguro que deseas cerrar sesión?');
  if (!confirmed) return;

  const result = await window.slStudio.logout();
  if (result.success) {
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
    currentUser = null;
  }
}
