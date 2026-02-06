# Sl Studio

Hub de acceso eficiente a Microsoft 365 y Google Workspace para estudiantes chilenos.

## 📋 Descripción

Sl Studio es una aplicación de escritorio diseñada para estudiantes chilenos que centraliza el acceso a herramientas educativas de Microsoft 365, Google Workspace y otras plataformas, además de incluir funcionalidades de gestión de horarios, tareas y colaboración.

## ✨ Características

### Acceso Centralizado
- **Microsoft 365**: Word, Excel, PowerPoint, Teams, OneDrive, Outlook, y más
- **Google Workspace**: Docs, Sheets, Slides, Classroom, Meet, Drive, y más
- **Herramientas Extra**: SchoolNet, Santillana, Common Sense, DLI
- **Asistentes IA**: Copilot 365, ChatGPT, Claude, Grok

### Gestión Académica
- ✅ Horarios de clases personalizables
- 📝 Registro de pruebas y tareas con prioridades (Alta, Media, Baja)
- 📅 Calendario integrado
- 🎯 Descripciones detalladas de evaluaciones

### Colaboración
- 👥 Creación de cursos/grupos
- 🔗 Códigos únicos para unirse a cursos
- 📊 Horarios compartidos entre miembros

### Personalización
- 🎨 Más de 20 temas de color
- 🌓 Modo Oscuro / Claro / Sistema
- 🖼️ Interfaz estilo Opera GX futurista

### Seguridad
- 🔐 Contraseñas y PINs cifrados
- 🔒 Datos almacenados localmente
- ✅ Cumple con Ley 19.628 de Chile
- 📋 Políticas de Privacidad, Términos de Uso y Condiciones claras

## 🚀 Instalación

### Requisitos Previos
- Node.js 16 o superior
- npm o yarn
- Windows 10/11 (64-bit)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
```bash
cd sl-studio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Desarrollo**
```bash
npm start
```

4. **Construir instalador**
```bash
npm run build:win
```

Esto generará:
- `dist/Sl Studio Setup X.X.X.exe` - Instalador con opciones
- `dist/Sl Studio X.X.X.exe` - Versión portable

## 📁 Estructura del Proyecto

```
sl-studio/
├── src/
│   ├── main.js                 # Proceso principal de Electron
│   ├── preload.js              # API bridge segura
│   ├── database/
│   │   └── db.js               # Gestión de base de datos SQLite
│   └── renderer/
│       ├── index.html          # Interfaz principal
│       ├── styles/
│       │   ├── main.css        # Estilos principales
│       │   └── themes.css      # 24+ temas de color
│       └── js/
│           ├── app.js          # Lógica principal
│           ├── auth.js         # Autenticación
│           ├── captcha.js      # Sistema CAPTCHA
│           ├── apps-data.js    # Datos de aplicaciones
│           ├── schedules.js    # Gestión de horarios
│           ├── courses.js      # Gestión de cursos
│           └── settings.js     # Configuración
├── assets/
│   └── icons/                  # Iconos de la aplicación
├── package.json
└── LICENSE.txt
```

## 🎨 Temas Disponibles

- Azul Eléctrico (predeterminado)
- Púrpura Neón
- Rosa Cyber
- Verde Matrix
- Naranja Ardiente
- Amarillo Dorado
- Y 18+ más...

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ PINs de 4-16 dígitos
- ✅ Sistema CAPTCHA simple
- ✅ Validación de datos
- ✅ Prevención de modificaciones del código
- ✅ Protección contra XSS
- ✅ Datos almacenados en SQLite local

## 📱 Uso de Edad

- **Mínimo**: 8 años (3° Básico)
- **Recomendado**: Con supervisión de adultos para menores de 14 años

## 🇨🇱 Cumplimiento Legal (Chile)

Sl Studio cumple con:
- **Ley 19.628**: Protección de la Vida Privada
- **Ley 21.096**: Ley Aula Segura (aplicable a menores)
- Derecho a acceso, rectificación y eliminación de datos personales

## 🛠️ Desarrollo

### Comandos Disponibles

```bash
# Desarrollo con auto-reload
npm start

# Build para Windows
npm run build:win

# Build general
npm run build
```

### Tecnologías Utilizadas

- **Electron**: Framework para apps de escritorio
- **SQLite**: Base de datos local
- **bcryptjs**: Cifrado de contraseñas
- **HTML/CSS/JavaScript**: Frontend vanilla (sin frameworks)

## 📦 Instalador

El instalador NSIS permite:
- ✅ Elegir directorio de instalación
- ✅ Crear accesos directos en Escritorio y Menú Inicio
- ✅ Desinstalación limpia
- ✅ Licencia en español

## 🐛 Problemas Conocidos

1. **VPN**: La funcionalidad VPN fue removida por complejidad legal y técnica
2. **E2EE completo**: Se usa cifrado para contraseñas, pero no E2EE total entre usuarios
3. **Integración API**: No hay integración directa con APIs de Microsoft/Google (solo enlaces)

## 🔮 Mejoras Futuras

- [ ] Sincronización en la nube (opcional)
- [ ] Integración real con APIs de Microsoft/Google
- [ ] Notificaciones de recordatorio
- [ ] Exportar horarios a PDF
- [ ] App móvil (Android/iOS)
- [ ] Modo offline completo

## 📄 Licencia

Ver `LICENSE.txt` para más detalles.

## 👤 Soporte

Para reportar problemas o sugerencias:
1. Usa el botón de feedback en la aplicación
2. Contacta con el administrador de tu colegio

## ⚠️ Importante

- Esta es una app de acceso/organizador, no reemplaza las cuentas oficiales de Microsoft/Google
- Necesitas tener cuentas válidas en los servicios que desees usar
- Los enlaces abren los servicios en tu navegador predeterminado
- Mantén tu contraseña y PIN seguros

---

Desarrollado para estudiantes chilenos 🇨🇱
