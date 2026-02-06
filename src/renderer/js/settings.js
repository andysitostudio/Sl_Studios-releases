// Gestión de configuración

const availableColors = [
  { id: 'electric-blue', name: 'Azul Eléctrico' },
  { id: 'neon-purple', name: 'Púrpura Neón' },
  { id: 'cyber-pink', name: 'Rosa Cyber' },
  { id: 'matrix-green', name: 'Verde Matrix' },
  { id: 'fire-orange', name: 'Naranja Ardiente' },
  { id: 'gold-yellow', name: 'Amarillo Dorado' },
  { id: 'scarlet-red', name: 'Rojo Escarlata' },
  { id: 'turquoise', name: 'Turquesa' },
  { id: 'magenta', name: 'Magenta' },
  { id: 'lime', name: 'Lime' },
  { id: 'coral', name: 'Coral' },
  { id: 'lavender', name: 'Lavanda' },
  { id: 'mint', name: 'Menta' },
  { id: 'amber', name: 'Ámbar' },
  { id: 'indigo', name: 'Índigo' },
  { id: 'teal', name: 'Teal' },
  { id: 'crimson', name: 'Carmesí' },
  { id: 'aquamarine', name: 'Aguamarina' },
  { id: 'violet', name: 'Violeta' },
  { id: 'ocean', name: 'Océano' },
  { id: 'salmon', name: 'Salmón' },
  { id: 'emerald', name: 'Esmeralda' },
  { id: 'ruby', name: 'Rubí' },
  { id: 'sapphire', name: 'Zafiro' }
];

function loadSettingsView() {
  const view = document.getElementById('view-settings');
  
  view.innerHTML = `
    <div class="content-header">
      <h1>Configuración</h1>
      <p>Personaliza tu experiencia en Sl Studio</p>
    </div>

    <div style="max-width: 800px;">
      <!-- Personalización -->
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h2 style="margin-bottom: 20px; color: var(--primary-color);">🎨 Personalización</h2>
        
        <div style="margin-bottom: 32px;">
          <h3 style="margin-bottom: 16px; font-size: 16px;">Color de Interfaz</h3>
          <div id="color-picker" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); gap: 12px;"></div>
        </div>

        <div>
          <h3 style="margin-bottom: 16px; font-size: 16px;">Modo de Fondo</h3>
          <div style="display: flex; gap: 12px;">
            <button class="mode-btn" data-mode="dark" style="flex: 1; padding: 16px; background: var(--bg-tertiary); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); cursor: pointer; font-weight: 600; transition: all 0.2s;">
              🌙 Oscuro
            </button>
            <button class="mode-btn" data-mode="light" style="flex: 1; padding: 16px; background: var(--bg-tertiary); border: 2px solid var(--border-color); border-radius: 8px; color: var(--text-primary); cursor: pointer; font-weight: 600; transition: all 0.2s;">
              ☀️ Claro
            </button>
          </div>
        </div>
      </div>

      <!-- Cuenta -->
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h2 style="margin-bottom: 20px; color: var(--primary-color);">👤 Cuenta</h2>
        
        <div style="color: var(--text-secondary); margin-bottom: 20px;">
          <div style="margin-bottom: 12px;">
            <strong style="color: var(--text-primary);">Nombre de usuario:</strong> <span id="settings-username"></span>
          </div>
          <div style="margin-bottom: 12px;">
            <strong style="color: var(--text-primary);">Correo:</strong> <span id="settings-email"></span>
          </div>
          <div>
            <strong style="color: var(--text-primary);">Nombre completo:</strong> <span id="settings-fullname"></span>
          </div>
        </div>

        <button onclick="logout()" class="btn" style="background: var(--error); color: white;">
          Cerrar Sesión
        </button>
      </div>

      <!-- Sobre Sl Studio -->
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px;">
        <h2 style="margin-bottom: 16px; color: var(--primary-color);">ℹ️ Sobre Sl Studio</h2>
        
        <div style="color: var(--text-secondary); line-height: 1.8;">
          <p style="margin-bottom: 12px;"><strong style="color: var(--text-primary);">Versión:</strong> <span id="app-version">Cargando...</span></p>
          <p style="margin-bottom: 12px;"><strong style="color: var(--text-primary);">Región:</strong> Chile</p>
          <p style="margin-bottom: 16px;">Hub de acceso eficiente a Microsoft 365 y Google Workspace para estudiantes chilenos.</p>
          
          <button id="check-updates-btn" class="btn btn-primary" style="margin-bottom: 16px;">
            🔄 Buscar Actualizaciones
          </button>
          <div id="update-status" style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;"></div>
          
          <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 8px;">
            <p style="font-size: 13px; line-height: 1.6;">
              Sl Studio cumple con la legislación chilena de protección de datos (Ley 19.628). 
              Todos los datos se almacenan localmente de forma segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  loadCurrentSettings();
  setupSettingsListeners();
}

async function loadCurrentSettings() {
  try {
    const settingsResult = await window.slStudio.getSettings();
    const sessionResult = await window.slStudio.checkSession();

    if (settingsResult.success && sessionResult.success) {
      const settings = settingsResult.data;
      const user = sessionResult.data;

      // Actualizar información del usuario
      document.getElementById('settings-username').textContent = '@' + user.username;
      document.getElementById('settings-email').textContent = user.email;
      document.getElementById('settings-fullname').textContent = `${user.nombre} ${user.apellido}`;

      // Obtener y mostrar versión de la app
      const versionResult = await window.slStudio.getAppVersion();
      if (versionResult.success) {
        document.getElementById('app-version').textContent = 'v' + versionResult.version;
      }

      // Renderizar selector de colores
      const colorPicker = document.getElementById('color-picker');
      colorPicker.innerHTML = availableColors.map(color => `
        <div class="color-option ${color.id === settings.theme_color ? 'selected' : ''} color-${color.id}" 
             data-color="${color.id}" 
             title="${color.name}"
             style="width: 50px; height: 50px; border-radius: 8px; cursor: pointer; border: 2px solid ${color.id === settings.theme_color ? 'var(--text-primary)' : 'transparent'}; transition: all 0.2s;">
        </div>
      `).join('');

      // Marcar modo actual
      document.querySelectorAll('.mode-btn').forEach(btn => {
        if (btn.getAttribute('data-mode') === settings.background_mode) {
          btn.style.borderColor = 'var(--primary-color)';
          btn.style.boxShadow = '0 0 12px var(--primary-color)';
        }
      });
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

function setupSettingsListeners() {
  // Botón de verificar actualizaciones
  const checkUpdatesBtn = document.getElementById('check-updates-btn');
  const updateStatus = document.getElementById('update-status');
  
  if (checkUpdatesBtn) {
    checkUpdatesBtn.addEventListener('click', async () => {
      checkUpdatesBtn.disabled = true;
      checkUpdatesBtn.textContent = '🔄 Buscando...';
      updateStatus.textContent = 'Verificando actualizaciones...';
      updateStatus.style.color = 'var(--text-secondary)';
      
      try {
        const result = await window.slStudio.checkForUpdates();
        checkUpdatesBtn.disabled = false;
        checkUpdatesBtn.textContent = '🔄 Buscar Actualizaciones';
        
        if (result.success) {
          updateStatus.textContent = '✅ Verificación completada. Revisa las notificaciones.';
          updateStatus.style.color = 'var(--success)';
        } else {
          updateStatus.textContent = '❌ Error al verificar actualizaciones.';
          updateStatus.style.color = 'var(--error)';
        }
      } catch (error) {
        checkUpdatesBtn.disabled = false;
        checkUpdatesBtn.textContent = '🔄 Buscar Actualizaciones';
        updateStatus.textContent = '❌ Error de conexión.';
        updateStatus.style.color = 'var(--error)';
      }
      
      setTimeout(() => {
        updateStatus.textContent = '';
      }, 5000);
    });
  }

  // Selector de color
  document.getElementById('color-picker').addEventListener('click', async (e) => {
    const colorOption = e.target.closest('.color-option');
    if (!colorOption) return;

    const selectedColor = colorOption.getAttribute('data-color');
    
    // Actualizar UI
    document.querySelectorAll('.color-option').forEach(opt => {
      opt.classList.remove('selected');
      opt.style.borderColor = 'transparent';
    });
    colorOption.classList.add('selected');
    colorOption.style.borderColor = 'var(--text-primary)';

    // Obtener configuración actual
    const settingsResult = await window.slStudio.getSettings();
    const currentMode = settingsResult.data.background_mode;

    // Aplicar tema
    applyTheme(selectedColor, currentMode);

    // Guardar
    await window.slStudio.updateSettings({
      themeColor: selectedColor,
      backgroundMode: currentMode
    });
  });

  // Selector de modo
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const selectedMode = btn.getAttribute('data-mode');
      
      // Actualizar UI
      document.querySelectorAll('.mode-btn').forEach(b => {
        b.style.borderColor = 'var(--border-color)';
        b.style.boxShadow = 'none';
      });
      btn.style.borderColor = 'var(--primary-color)';
      btn.style.boxShadow = '0 0 12px var(--primary-color)';

      // Obtener configuración actual
      const settingsResult = await window.slStudio.getSettings();
      const currentColor = settingsResult.data.theme_color;

      // Aplicar tema
      applyTheme(currentColor, selectedMode);

      // Guardar
      await window.slStudio.updateSettings({
        themeColor: currentColor,
        backgroundMode: selectedMode
      });
    });
  });
}
