// Sistema de CAPTCHA simple para Sl Studio

class SimpleCaptcha {
  constructor(containerId, inputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.captchaText = '';
    this.generateCaptcha();
    this.setupRefreshButton();
  }

  generateCaptcha() {
    // Generar texto aleatorio simple de 5 caracteres (letras y números)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sin caracteres confusos (I, O, 0, 1)
    this.captchaText = '';
    for (let i = 0; i < 5; i++) {
      this.captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    this.container.querySelector('.captcha-text').textContent = this.captchaText;
  }

  setupRefreshButton() {
    const refreshBtn = this.container.querySelector('.captcha-refresh');
    refreshBtn.addEventListener('click', () => {
      this.generateCaptcha();
      if (this.input) {
        this.input.value = '';
      }
    });
  }

  verify(userInput) {
    return userInput.toUpperCase() === this.captchaText;
  }

  reset() {
    this.generateCaptcha();
    if (this.input) {
      this.input.value = '';
    }
  }
}

// Inicializar CAPTCHAs cuando el DOM esté listo
let loginCaptcha, regCaptcha1, regCaptcha2;

document.addEventListener('DOMContentLoaded', () => {
  // CAPTCHA para login
  if (document.getElementById('login-captcha')) {
    loginCaptcha = new SimpleCaptcha('login-captcha', 'login-captcha-input');
  }

  // CAPTCHAs para registro
  if (document.getElementById('reg-captcha-1')) {
    regCaptcha1 = new SimpleCaptcha('reg-captcha-1', 'reg-captcha-input-1');
  }
  if (document.getElementById('reg-captcha-2')) {
    regCaptcha2 = new SimpleCaptcha('reg-captcha-2', 'reg-captcha-input-2');
  }
});
