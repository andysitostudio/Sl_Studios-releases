// Datos de todas las aplicaciones disponibles en Sl Studio

const appsData = {
  microsoft: [
    { name: 'Word', icon: '📝', url: 'https://www.office.com/launch/word' },
    { name: 'Excel', icon: '📊', url: 'https://www.office.com/launch/excel' },
    { name: 'PowerPoint', icon: '📽️', url: 'https://www.office.com/launch/powerpoint' },
    { name: 'OneNote', icon: '📔', url: 'https://www.office.com/launch/onenote' },
    { name: 'Outlook', icon: '📧', url: 'https://outlook.office.com' },
    { name: 'Teams', icon: '👥', url: 'https://teams.microsoft.com' },
    { name: 'OneDrive', icon: '☁️', url: 'https://onedrive.live.com' },
    { name: 'SharePoint', icon: '🔗', url: 'https://www.office.com/launch/sharepoint' },
    { name: 'Planner', icon: '📋', url: 'https://tasks.office.com' },
    { name: 'To Do', icon: '✅', url: 'https://to-do.office.com' },
    { name: 'Forms', icon: '📝', url: 'https://forms.office.com' },
    { name: 'Viva Engage', icon: '💬', url: 'https://engage.cloud.microsoft' },
    { name: 'Lists', icon: '📑', url: 'https://www.office.com/launch/lists' },
    { name: 'Access', icon: '🗄️', url: 'https://www.office.com/launch/access' },
    { name: 'Publisher', icon: '📰', url: 'https://www.office.com/launch/publisher' },
    { name: 'Sway', icon: '🎨', url: 'https://sway.office.com' },
    { name: 'Stream', icon: '🎬', url: 'https://stream.office.com' },
    { name: 'Whiteboard', icon: '🖼️', url: 'https://whiteboard.office.com' },
    { name: 'Loop', icon: '🔄', url: 'https://loop.microsoft.com' },
    { name: 'Delve', icon: '🔍', url: 'https://delve.office.com' },
    { name: 'Power BI', icon: '📈', url: 'https://app.powerbi.com' },
    { name: 'Visio', icon: '📐', url: 'https://www.office.com/launch/visio' },
    { name: 'Power Automate', icon: '⚡', url: 'https://flow.microsoft.com' }
  ],
  
  google: [
    { name: 'Docs', icon: '📄', url: 'https://docs.google.com' },
    { name: 'Sheets', icon: '📊', url: 'https://sheets.google.com' },
    { name: 'Slides', icon: '📽️', url: 'https://slides.google.com' },
    { name: 'Forms', icon: '📝', url: 'https://docs.google.com/forms' },
    { name: 'Keep', icon: '📌', url: 'https://keep.google.com' },
    { name: 'Classroom', icon: '🎓', url: 'https://classroom.google.com' },
    { name: 'Meet', icon: '🎥', url: 'https://meet.google.com' },
    { name: 'Chat', icon: '💬', url: 'https://chat.google.com' },
    { name: 'Gmail', icon: '📧', url: 'https://mail.google.com' },
    { name: 'Drive', icon: '☁️', url: 'https://drive.google.com' },
    { name: 'Calendar', icon: '📅', url: 'https://calendar.google.com' },
    { name: 'Sites', icon: '🌐', url: 'https://sites.google.com' },
    { name: 'Gemini', icon: '✨', url: 'https://gemini.google.com' },
    { name: 'NotebookLM', icon: '📓', url: 'https://notebooklm.google.com' },
    { name: 'AppSheet', icon: '📱', url: 'https://appsheet.com' },
    { name: 'Vids', icon: '🎬', url: 'https://vids.google.com' },
    { name: 'Workspace', icon: '🏢', url: 'https://workspace.google.com' },
    { name: 'Tasks', icon: '✅', url: 'https://tasks.google.com' },
    { name: 'Cloud Search', icon: '🔍', url: 'https://cloudsearch.google.com' }
  ],
  
  extras: [
    { name: 'SchoolNet', icon: '🏫', url: 'https://www.schoolnet.cl' },
    { name: 'Santillana', icon: '📚', url: 'https://www.santillana.cl' },
    { name: 'Common Sense', icon: '🧠', url: 'https://www.commonsense.org/education' },
    { name: 'DLI', icon: '🌍', url: 'https://www.dliflc.edu' }
  ],
  
  ai: [
    { name: 'Copilot 365', icon: '🤖', url: 'https://copilot.microsoft.com' },
    { name: 'ChatGPT', icon: '💬', url: 'https://chat.openai.com' },
    { name: 'Claude', icon: '🧠', url: 'https://claude.ai' },
    { name: 'Grok', icon: '⚡', url: 'https://grok.x.ai' }
  ]
};

// Renderizar aplicaciones en el DOM
function renderApps() {
  const microsoftGrid = document.getElementById('microsoft-apps');
  const googleGrid = document.getElementById('google-apps');
  const extraGrid = document.getElementById('extra-apps');

  if (microsoftGrid) {
    microsoftGrid.innerHTML = appsData.microsoft.map(app => `
      <div class="app-card" data-url="${app.url}">
        <div class="app-icon">${app.icon}</div>
        <div class="app-name">${app.name}</div>
      </div>
    `).join('');
  }

  if (googleGrid) {
    googleGrid.innerHTML = appsData.google.map(app => `
      <div class="app-card" data-url="${app.url}">
        <div class="app-icon">${app.icon}</div>
        <div class="app-name">${app.name}</div>
      </div>
    `).join('');
  }

  if (extraGrid) {
    extraGrid.innerHTML = appsData.extras.map(app => `
      <div class="app-card" data-url="${app.url}">
        <div class="app-icon">${app.icon}</div>
        <div class="app-name">${app.name}</div>
      </div>
    `).join('');
  }

  // Agregar event listeners para abrir apps
  document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.getAttribute('data-url');
      if (window.slStudio && window.slStudio.openExternal) {
        require('electron').shell.openExternal(url);
      } else {
        window.open(url, '_blank');
      }
    });
  });
}

// Renderizar apps de IA en la sección correspondiente
function renderAIApps() {
  const aiView = document.getElementById('view-ai');
  if (!aiView) return;

  aiView.innerHTML = `
    <div class="content-header">
      <h1>Asistentes de IA</h1>
      <p>Acceso directo a herramientas de inteligencia artificial</p>
    </div>
    <div class="app-grid" style="max-width: 800px;">
      ${appsData.ai.map(app => `
        <div class="app-card" data-url="${app.url}" style="padding: 32px;">
          <div class="app-icon" style="font-size: 64px; margin-bottom: 16px;">${app.icon}</div>
          <div class="app-name" style="font-size: 16px;">${app.name}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Agregar event listeners
  aiView.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.getAttribute('data-url');
      require('electron').shell.openExternal(url);
    });
  });
}
