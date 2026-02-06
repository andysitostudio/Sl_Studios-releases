// Gestión de horarios y pruebas

function loadSchedulesView() {
  const view = document.getElementById('view-schedules');
  
  view.innerHTML = `
    <div class="content-header">
      <h1>Horarios y Pruebas</h1>
      <p>Organiza tus clases, tareas y evaluaciones</p>
    </div>

    <div style="margin-bottom: 24px;">
      <button class="btn btn-primary" id="add-schedule-btn">+ Agregar Horario/Prueba</button>
    </div>

    <div id="schedules-container" class="schedules-grid"></div>

    <div id="schedule-form-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Agregar Horario/Prueba</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form id="schedule-form" class="auth-form">
            <div class="form-group">
              <label>Tipo</label>
              <select id="schedule-tipo" required>
                <option value="clase">Clase</option>
                <option value="prueba">Prueba</option>
                <option value="tarea">Tarea</option>
                <option value="examen">Examen</option>
              </select>
            </div>

            <div class="form-group">
              <label>Título</label>
              <input type="text" id="schedule-titulo" required placeholder="Ej: Matemáticas, Prueba de Historia">
            </div>

            <div class="form-group">
              <label>Descripción (opcional)</label>
              <textarea id="schedule-descripcion" rows="3" style="resize: vertical; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; color: var(--text-primary); width: 100%; font-family: inherit;"></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Fecha</label>
                <input type="date" id="schedule-fecha" required>
              </div>
              <div class="form-group" id="prioridad-group" style="display: none;">
                <label>Prioridad</label>
                <select id="schedule-prioridad">
                  <option value="baja">Baja</option>
                  <option value="media" selected>Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Hora Inicio (opcional)</label>
                <input type="time" id="schedule-hora-inicio">
              </div>
              <div class="form-group">
                <label>Hora Fin (opcional)</label>
                <input type="time" id="schedule-hora-fin">
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Cargar horarios existentes
  loadSchedules();

  // Event listeners
  document.getElementById('add-schedule-btn').addEventListener('click', showScheduleForm);
  document.getElementById('schedule-tipo').addEventListener('change', (e) => {
    const prioridadGroup = document.getElementById('prioridad-group');
    if (e.target.value === 'prueba' || e.target.value === 'examen') {
      prioridadGroup.style.display = 'block';
    } else {
      prioridadGroup.style.display = 'none';
    }
  });

  document.getElementById('schedule-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const scheduleData = {
      tipo: document.getElementById('schedule-tipo').value,
      titulo: document.getElementById('schedule-titulo').value,
      descripcion: document.getElementById('schedule-descripcion').value,
      fecha: document.getElementById('schedule-fecha').value,
      horaInicio: document.getElementById('schedule-hora-inicio').value,
      horaFin: document.getElementById('schedule-hora-fin').value,
      prioridad: document.getElementById('schedule-prioridad').value
    };

    const result = await window.slStudio.addSchedule(scheduleData);
    if (result.success) {
      hideScheduleForm();
      loadSchedules();
    }
  });

  const modal = document.getElementById('schedule-form-modal');
  modal.querySelector('.modal-close').onclick = hideScheduleForm;
  modal.onclick = (e) => {
    if (e.target === modal) hideScheduleForm();
  };
}

function showScheduleForm() {
  document.getElementById('schedule-form-modal').style.display = 'flex';
  document.getElementById('schedule-form').reset();
}

function hideScheduleForm() {
  document.getElementById('schedule-form-modal').style.display = 'none';
}

async function loadSchedules() {
  const result = await window.slStudio.getSchedules();
  const container = document.getElementById('schedules-container');
  
  if (!result.success || !result.data || result.data.length === 0) {
    container.innerHTML = '<p style="color: var(--text-secondary);">No tienes horarios guardados aún.</p>';
    return;
  }

  const prioridadColors = {
    alta: '#ff4444',
    media: '#ffaa00',
    baja: '#00ff88'
  };

  container.innerHTML = result.data.map(schedule => `
    <div class="schedule-card" style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
        <div>
          <span style="background: var(--bg-tertiary); padding: 4px 12px; border-radius: 6px; font-size: 12px; text-transform: uppercase; font-weight: 600;">${schedule.tipo}</span>
          ${schedule.prioridad ? `<span style="background: ${prioridadColors[schedule.prioridad]}; color: white; padding: 4px 12px; border-radius: 6px; font-size: 12px; margin-left: 8px; text-transform: uppercase; font-weight: 600;">${schedule.prioridad}</span>` : ''}
        </div>
        <button class="delete-schedule-btn" data-id="${schedule.id}" style="background: transparent; border: none; color: var(--error); cursor: pointer; font-size: 20px;">🗑️</button>
      </div>
      <h3 style="margin-bottom: 8px; color: var(--primary-color);">${schedule.titulo}</h3>
      ${schedule.descripcion ? `<p style="color: var(--text-secondary); margin-bottom: 12px; font-size: 14px;">${schedule.descripcion}</p>` : ''}
      <div style="color: var(--text-secondary); font-size: 14px;">
        <div>📅 ${formatDate(schedule.fecha)}</div>
        ${schedule.hora_inicio ? `<div>🕐 ${schedule.hora_inicio}${schedule.hora_fin ? ` - ${schedule.hora_fin}` : ''}</div>` : ''}
      </div>
    </div>
  `).join('');

  // Event listeners para eliminar
  document.querySelectorAll('.delete-schedule-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('¿Eliminar este horario?')) {
        await window.slStudio.deleteSchedule(id);
        loadSchedules();
      }
    });
  });
}

function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
