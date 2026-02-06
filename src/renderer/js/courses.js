// Gestión de cursos/grupos

function loadCoursesView() {
  const view = document.getElementById('view-courses');
  
  view.innerHTML = `
    <div class="content-header">
      <h1>Cursos y Grupos</h1>
      <p>Colabora con tus compañeros de clase</p>
    </div>

    <div style="margin-bottom: 24px;">
      <button class="btn btn-primary" id="create-course-btn">+ Crear Curso</button>
    </div>

    <div id="courses-container"></div>

    <div id="course-form-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Crear Curso</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form id="course-form" class="auth-form">
            <div class="form-group">
              <label>Nombre del Curso</label>
              <input type="text" id="course-nombre" required placeholder="Ej: Matemáticas 3° Medio">
            </div>

            <div class="form-group">
              <label>Descripción (opcional)</label>
              <textarea id="course-descripcion" rows="3" style="resize: vertical; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; color: var(--text-primary); width: 100%; font-family: inherit;" placeholder="Describe el curso o grupo"></textarea>
            </div>

            <div style="background: var(--bg-tertiary); padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 8px;">Al crear un curso, se generará un código único que podrás compartir con tus compañeros para que se unan.</p>
              <p style="color: var(--primary-color); font-size: 13px;">💡 Todos los miembros podrán ver los horarios y eventos del curso.</p>
            </div>

            <button type="submit" class="btn btn-primary">Crear Curso</button>
          </form>
        </div>
      </div>
    </div>
  `;

  loadCourses();

  document.getElementById('create-course-btn').addEventListener('click', showCourseForm);

  document.getElementById('course-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const courseData = {
      nombre: document.getElementById('course-nombre').value,
      descripcion: document.getElementById('course-descripcion').value
    };

    const result = await window.slStudio.createCourse(courseData);
    if (result.success) {
      hideCourseForm();
      alert(`¡Curso creado! Código: ${result.data.codigo}\n\nComparte este código con tus compañeros para que se unan.`);
      loadCourses();
    }
  });

  const modal = document.getElementById('course-form-modal');
  modal.querySelector('.modal-close').onclick = hideCourseForm;
  modal.onclick = (e) => {
    if (e.target === modal) hideCourseForm();
  };
}

function showCourseForm() {
  document.getElementById('course-form-modal').style.display = 'flex';
  document.getElementById('course-form').reset();
}

function hideCourseForm() {
  document.getElementById('course-form-modal').style.display = 'none';
}

async function loadCourses() {
  const result = await window.slStudio.getCourses();
  const container = document.getElementById('courses-container');
  
  if (!result.success || !result.data || result.data.length === 0) {
    container.innerHTML = '<p style="color: var(--text-secondary);">No tienes cursos aún. ¡Crea uno o únete con un código!</p>';
    return;
  }

  container.innerHTML = result.data.map(course => `
    <div class="course-card" style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
        <div>
          <h3 style="margin-bottom: 8px; color: var(--primary-color); font-size: 20px;">${course.nombre}</h3>
          ${course.descripcion ? `<p style="color: var(--text-secondary); margin-bottom: 12px;">${course.descripcion}</p>` : ''}
        </div>
        <div style="background: var(--bg-tertiary); padding: 8px 16px; border-radius: 8px;">
          <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 4px;">Código</div>
          <div style="font-family: monospace; font-size: 18px; font-weight: 700; color: var(--primary-color);">${course.codigo}</div>
        </div>
      </div>
      <div style="color: var(--text-secondary); font-size: 14px;">
        <div>👤 Creador: @${course.creator_username}</div>
        <div>📅 Creado: ${formatDate(course.created_at)}</div>
      </div>
    </div>
  `).join('');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
}
