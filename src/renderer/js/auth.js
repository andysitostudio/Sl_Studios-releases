// Sistema de autenticación para Sl Studio

// Datos de cursos por nivel
const cursosData = {
  primaria: [
    '3° Básico', '4° Básico', '5° Básico', '6° Básico',
    '7° Básico', '8° Básico'
  ],
  secundaria: [
    '1° Medio', '2° Medio', '3° Medio', '4° Medio'
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  // Manejar cambio de tabs
  const authTabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabType = tab.getAttribute('data-tab');
      if (tabType === 'login') {
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
      } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
      }
    });
  });

  // Manejar cambio de nivel educativo
  const nivelSelect = document.getElementById('reg-nivel');
  const cursoSelect = document.getElementById('reg-curso');

  if (nivelSelect && cursoSelect) {
    nivelSelect.addEventListener('change', (e) => {
      const nivel = e.target.value;
      cursoSelect.disabled = false;
      cursoSelect.innerHTML = '<option value="">Selecciona tu curso</option>';

      if (cursosData[nivel]) {
        cursosData[nivel].forEach(curso => {
          const option = document.createElement('option');
          option.value = curso;
          option.textContent = curso;
          cursoSelect.appendChild(option);
        });
      }
    });
  }

  // Manejar formulario de login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      const captchaInput = document.getElementById('login-captcha-input').value;
      const pin = document.getElementById('login-pin').value;
      const errorDiv = document.getElementById('login-error');

      // Verificar CAPTCHA
      if (!loginCaptcha.verify(captchaInput)) {
        showError(errorDiv, 'El CAPTCHA es incorrecto');
        loginCaptcha.reset();
        return;
      }

      try {
        const result = await window.slStudio.login({ username, password, pin });

        if (result.success) {
          // Login exitoso
          hideAuthScreen();
          showMainApp(result.data);
        } else {
          showError(errorDiv, result.error);
          loginCaptcha.reset();
        }
      } catch (error) {
        showError(errorDiv, 'Error al iniciar sesión. Por favor intenta de nuevo.');
        loginCaptcha.reset();
      }
    });
  }

  // Manejar formulario de registro
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombre = document.getElementById('reg-nombre').value;
      const apellido = document.getElementById('reg-apellido').value;
      const username = document.getElementById('reg-username').value;
      const nickname = document.getElementById('reg-nickname').value;
      const telefono = document.getElementById('reg-telefono').value;
      const rut = document.getElementById('reg-rut').value;
      const email = document.getElementById('reg-email').value;
      const nivelEducativo = document.getElementById('reg-nivel').value;
      const curso = document.getElementById('reg-curso').value;
      const pin = document.getElementById('reg-pin').value;
      const password = document.getElementById('reg-password').value;
      const captcha1 = document.getElementById('reg-captcha-input-1').value;
      const captcha2 = document.getElementById('reg-captcha-input-2').value;
      const terms = document.getElementById('reg-terms').checked;
      const errorDiv = document.getElementById('register-error');

      // Validaciones
      if (!terms) {
        showError(errorDiv, 'Debes aceptar las políticas y términos');
        return;
      }

      if (!regCaptcha1.verify(captcha1)) {
        showError(errorDiv, 'El primer CAPTCHA es incorrecto');
        regCaptcha1.reset();
        return;
      }

      if (!regCaptcha2.verify(captcha2)) {
        showError(errorDiv, 'El segundo CAPTCHA es incorrecto');
        regCaptcha2.reset();
        return;
      }

      try {
        const userData = {
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
        };

        const result = await window.slStudio.register(userData);

        if (result.success) {
          // Registro exitoso, ahora hacer login automático
          const loginResult = await window.slStudio.login({ username, password, pin });
          if (loginResult.success) {
            hideAuthScreen();
            showMainApp(loginResult.data);
          }
        } else {
          showError(errorDiv, result.error);
          regCaptcha1.reset();
          regCaptcha2.reset();
        }
      } catch (error) {
        showError(errorDiv, 'Error al registrarse. Por favor intenta de nuevo.');
        regCaptcha1.reset();
        regCaptcha2.reset();
      }
    });
  }

  // Enlaces de políticas
  document.getElementById('privacy-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    showPolicyModal('privacy');
  });

  document.getElementById('terms-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    showPolicyModal('terms');
  });

  document.getElementById('conditions-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    showPolicyModal('conditions');
  });
});

function showError(element, message) {
  element.textContent = message;
  element.classList.add('show');
  setTimeout(() => {
    element.classList.remove('show');
  }, 5000);
}

function hideAuthScreen() {
  document.getElementById('login-screen').style.display = 'none';
}

function showMainApp(userData) {
  const mainApp = document.getElementById('main-app');
  mainApp.style.display = 'flex';

  // Actualizar información del usuario
  const userName = document.getElementById('user-name');
  const userAvatar = document.getElementById('user-avatar');

  if (userName) {
    userName.textContent = userData.nickname || userData.username;
  }

  if (userAvatar) {
    const initials = (userData.nombre[0] + userData.apellido[0]).toUpperCase();
    userAvatar.textContent = initials;
  }

  // Renderizar aplicaciones
  renderApps();
  renderAIApps();
}

function showPolicyModal(type) {
  const modal = document.getElementById('policy-modal');
  const title = document.getElementById('policy-title');
  const content = document.getElementById('policy-content');

  const policies = {
    privacy: {
      title: 'Políticas de Privacidad',
      content: `
        <h3>1. Información que recopilamos</h3>
        <p>Sl Studio recopila la siguiente información:</p>
        <ul>
          <li>Datos de registro: nombre, apellido, correo electrónico, nombre de usuario</li>
          <li>Datos opcionales: teléfono, RUT</li>
          <li>Información educativa: nivel educativo y curso</li>
          <li>Datos de uso: horarios, tareas y configuraciones personales</li>
        </ul>

        <h3>2. Uso de la información</h3>
        <p>Utilizamos tu información para:</p>
        <ul>
          <li>Proporcionar acceso a la plataforma</li>
          <li>Gestionar horarios y tareas académicas</li>
          <li>Personalizar tu experiencia</li>
          <li>Mejorar nuestros servicios</li>
        </ul>

        <h3>3. Protección de datos</h3>
        <p>Sl Studio implementa medidas de seguridad para proteger tu información:</p>
        <ul>
          <li>Cifrado de contraseñas y PINs</li>
          <li>Almacenamiento local seguro</li>
          <li>Sin compartir datos con terceros sin tu consentimiento</li>
        </ul>

        <h3>4. Cumplimiento legal (Chile)</h3>
        <p>Cumplimos con:</p>
        <ul>
          <li><strong>Ley 19.628</strong> sobre Protección de la Vida Privada</li>
          <li>Derecho a acceder, modificar y eliminar tus datos personales</li>
          <li>Consentimiento explícito para el tratamiento de datos</li>
        </ul>

        <h3>5. Tus derechos</h3>
        <p>Tienes derecho a:</p>
        <ul>
          <li>Acceder a tu información personal</li>
          <li>Corregir datos inexactos</li>
          <li>Solicitar la eliminación de tu cuenta</li>
          <li>Retirar tu consentimiento en cualquier momento</li>
        </ul>
      `
    },
    terms: {
      title: 'Términos de Uso',
      content: `
        <h3>1. Aceptación de términos</h3>
        <p>Al usar Sl Studio, aceptas estos términos de uso. Si no estás de acuerdo, no utilices la aplicación.</p>

        <h3>2. Uso apropiado</h3>
        <p>Te comprometes a:</p>
        <ul>
          <li>Usar la aplicación solo con fines educativos</li>
          <li>No compartir tu contraseña o PIN</li>
          <li>No intentar acceder a cuentas de otros usuarios</li>
          <li>No usar la aplicación para actividades ilegales</li>
        </ul>

        <h3>3. Contenido del usuario</h3>
        <ul>
          <li>Eres responsable del contenido que creas (horarios, notas, etc.)</li>
          <li>Mantienes todos los derechos sobre tu contenido</li>
          <li>No compartimos tu contenido sin tu permiso</li>
        </ul>

        <h3>4. Servicios de terceros</h3>
        <p>Sl Studio proporciona enlaces a servicios de Microsoft, Google y otros. El uso de estos servicios está sujeto a sus propios términos.</p>

        <h3>5. Modificaciones</h3>
        <p>Nos reservamos el derecho de modificar estos términos. Te notificaremos sobre cambios importantes.</p>

        <h3>6. Limitación de responsabilidad</h3>
        <p>Sl Studio se proporciona "tal cual". No garantizamos disponibilidad ininterrumpida ni resultados específicos.</p>
      `
    },
    conditions: {
      title: 'Condiciones',
      content: `
        <h3>1. Requisitos de edad</h3>
        <p>Sl Studio está diseñado para estudiantes a partir de 3° Básico (8 años). Los menores de 14 años deben contar con autorización de un adulto responsable.</p>

        <h3>2. Cuenta de usuario</h3>
        <ul>
          <li>Solo puedes crear una cuenta por persona</li>
          <li>Debes proporcionar información veraz</li>
          <li>Eres responsable de mantener tu cuenta segura</li>
        </ul>

        <h3>3. Uso de la aplicación</h3>
        <ul>
          <li>La aplicación es gratuita para uso educativo</li>
          <li>No está permitido el uso comercial sin autorización</li>
          <li>Nos reservamos el derecho de suspender cuentas que violen estos términos</li>
        </ul>

        <h3>4. Datos y respaldos</h3>
        <ul>
          <li>Los datos se almacenan localmente en tu dispositivo</li>
          <li>Eres responsable de hacer respaldos de tu información</li>
          <li>No nos hacemos responsables por pérdida de datos</li>
        </ul>

        <h3>5. Propiedad intelectual</h3>
        <ul>
          <li>Sl Studio y su código son propiedad de sus creadores</li>
          <li>No está permitido copiar, modificar o redistribuir la aplicación</li>
          <li>Los logos de Microsoft, Google y otros son propiedad de sus respectivas compañías</li>
        </ul>

        <h3>6. Soporte y actualizaciones</h3>
        <ul>
          <li>Proporcionamos actualizaciones periódicas</li>
          <li>El soporte se ofrece dentro de lo posible</li>
          <li>No garantizamos resolución de todos los problemas</li>
        </ul>
      `
    }
  };

  const policy = policies[type];
  title.textContent = policy.title;
  content.innerHTML = policy.content;
  modal.style.display = 'flex';

  // Cerrar modal
  modal.querySelector('.modal-close').onclick = () => {
    modal.style.display = 'none';
  };

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };
}
