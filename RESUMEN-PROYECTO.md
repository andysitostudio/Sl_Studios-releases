# 📦 SL STUDIO - RESUMEN DEL PROYECTO

## 🎯 ¿Qué es Sl Studio?

Sl Studio es una **aplicación de escritorio para Windows** diseñada específicamente para estudiantes chilenos. Funciona como un **hub centralizado** que proporciona acceso rápido a todas las herramientas educativas de Microsoft 365, Google Workspace y otras plataformas, además de incluir funcionalidades de gestión académica.

---

## ✨ Características Principales

### 1. 🚀 Launcher de Aplicaciones
- **Microsoft 365**: 23 aplicaciones incluyendo Word, Excel, PowerPoint, Teams, OneDrive, etc.
- **Google Workspace**: 19 aplicaciones incluyendo Docs, Sheets, Slides, Classroom, Meet, etc.
- **Herramientas Extra**: SchoolNet, Santillana, Common Sense, DLI
- **Asistentes IA**: Copilot 365, ChatGPT, Claude, Grok

### 2. 📅 Gestión de Horarios
- Crear y organizar horarios de clases
- Registrar pruebas y exámenes
- Añadir descripciones y notas
- Establecer prioridades (Alta, Media, Baja)
- Calendario visual

### 3. 👥 Sistema de Cursos
- Crear grupos/cursos colaborativos
- Código único para unirse
- Compartir horarios entre miembros
- Similar a grupos de WhatsApp pero para estudios

### 4. 🎨 Personalización Completa
- **24+ temas de color** predefinidos
- **3 modos de fondo**: Oscuro, Claro, Sistema
- **Interfaz futurista** estilo Opera GX
- Totalmente personalizable

### 5. 🔒 Seguridad y Privacidad
- Contraseñas cifradas con bcrypt
- PINs de 4-16 dígitos
- Sistema CAPTCHA simple
- Datos almacenados localmente (SQLite)
- Cumple con Ley 19.628 de Chile
- Sin conexión a servidores externos

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico:
- **Electron**: Framework principal para aplicación de escritorio
- **SQLite**: Base de datos local
- **bcryptjs**: Cifrado de contraseñas
- **HTML/CSS/JavaScript Vanilla**: Frontend sin frameworks
- **Node.js**: Backend

### Estructura del Código:

```
sl-studio/
├── src/
│   ├── main.js              # Proceso principal de Electron
│   ├── preload.js           # Bridge de seguridad
│   ├── database/
│   │   └── db.js            # Gestión de base de datos
│   └── renderer/            # Interfaz de usuario
│       ├── index.html
│       ├── styles/
│       │   ├── main.css
│       │   └── themes.css
│       └── js/
│           ├── app.js
│           ├── auth.js
│           ├── captcha.js
│           ├── apps-data.js
│           ├── schedules.js
│           ├── courses.js
│           └── settings.js
├── assets/
│   └── icons/
├── package.json
├── LICENSE.txt
├── README.md
└── INSTALACION.md
```

---

## 📊 Base de Datos

### Tablas Principales:

1. **users**: Información de usuarios (nombre, email, contraseña, curso, etc.)
2. **sessions**: Sesiones activas para mantener login
3. **settings**: Preferencias de personalización
4. **schedules**: Horarios, clases y pruebas
5. **courses**: Cursos/grupos creados
6. **course_members**: Relación muchos-a-muchos entre usuarios y cursos

---

## 🎨 Diseño UI/UX

### Filosofía de Diseño:
- **Futurista**: Inspirado en Opera GX
- **Intuitivo**: Navegación clara con sidebar
- **Responsivo**: Se adapta a diferentes tamaños de ventana
- **Moderno**: Gradientes, sombras, animaciones suaves

### Elementos Clave:
- Barra de título personalizada (sin borde de Windows)
- Sidebar con navegación icónica
- Cards con hover effects
- Modales para formularios
- Animaciones de transición

---

## 🔐 Seguridad Implementada

### Nivel de Aplicación:
1. **Contraseñas**: Hasheadas con bcrypt (10 rounds)
2. **PINs**: Hasheados con bcrypt
3. **CAPTCHAs**: Sistema simple de verificación
4. **Validación**: Inputs validados en frontend y backend
5. **Context Isolation**: Electron con contextBridge
6. **No DevTools**: Deshabilitadas en producción

### Nivel de Datos:
1. **Local Storage**: Todos los datos en SQLite local
2. **Sin Servidores**: No hay transmisión de datos
3. **Sesiones**: Tokens generados con crypto.randomBytes

---

## 📋 Requisitos del Sistema

### Mínimos:
- Windows 10 (64-bit)
- 4 GB RAM
- 500 MB espacio en disco
- Conexión a internet (para acceder a las apps web)

### Recomendados:
- Windows 11
- 8 GB RAM
- 1 GB espacio en disco
- SSD

---

## 🚀 Proceso de Instalación

### Para Usuarios Finales:
1. Descargar `Sl Studio Setup.exe`
2. Ejecutar el instalador
3. Seguir el asistente
4. Elegir directorio de instalación
5. Crear accesos directos
6. ¡Listo para usar!

### Para Desarrolladores:
1. Clonar repositorio
2. `npm install`
3. `npm start` (desarrollo)
4. `npm run build:win` (producción)

---

## 📝 Consideraciones Importantes

### ✅ Lo que SÍ hace Sl Studio:
- Centraliza el acceso a aplicaciones web
- Gestiona horarios y tareas localmente
- Permite crear grupos de estudio
- Personaliza la experiencia del usuario
- Almacena datos de forma segura local

### ❌ Lo que NO hace Sl Studio:
- No integra directamente con APIs de Microsoft/Google
- No sincroniza datos en la nube
- No reemplaza las cuentas oficiales
- No incluye VPN (fue descartado por complejidad legal)
- No tiene E2EE completo entre usuarios (solo local)

---

## 🎓 Público Objetivo

### Edad:
- **Mínima**: 8 años (3° Básico)
- **Recomendada**: 8-18 años
- **Supervisión**: Recomendada para menores de 14 años

### Nivel Educativo:
- **Primaria**: 3° a 8° Básico
- **Secundaria**: 1° a 4° Medio

### Ubicación:
- **País**: Chile 🇨🇱
- **Legislación**: Cumple Ley 19.628

---

## 📊 Estadísticas del Proyecto

- **Líneas de código**: ~2,500
- **Archivos**: 15+ archivos principales
- **Temas**: 24 colores disponibles
- **Apps soportadas**: 46+ aplicaciones
- **Tablas BD**: 6 tablas principales
- **Tamaño instalador**: ~150-200 MB

---

## 🔮 Roadmap Futuro (Opcional)

### Versión 1.1:
- [ ] Notificaciones de recordatorios
- [ ] Exportar horarios a PDF/imagen
- [ ] Integración con calendario de Google
- [ ] Modo completamente offline

### Versión 2.0:
- [ ] Sincronización en la nube (opcional)
- [ ] App móvil (Android/iOS)
- [ ] Integración real con APIs
- [ ] Chatbot asistente interno

---

## 🐛 Issues Conocidos

1. **Iconos**: Se usan placeholders simples (mejorables)
2. **Códigos de curso**: No hay validación al unirse (feature pendiente)
3. **Respaldos**: No hay sistema automático de backup
4. **Idioma**: Solo español (sin i18n)

---

## 📄 Licencia y Legal

- **Licencia**: MIT (uso educativo gratuito)
- **Cumplimiento**: Ley 19.628 Chile
- **Políticas**: Incluye Privacidad, Términos, Condiciones
- **Edad**: Apto para 8+

---

## 🤝 Créditos

- **Diseño**: Inspirado en Opera GX
- **Tecnología**: Electron, SQLite, Node.js
- **Servicios**: Microsoft 365, Google Workspace
- **País**: Desarrollado en Chile 🇨🇱

---

## 📞 Soporte

Para soporte o consultas:
1. Revisa el archivo `README.md`
2. Consulta `INSTALACION.md` para problemas técnicos
3. Contacta al administrador de tu colegio

---

## ✨ Conclusión

Sl Studio es una solución completa para estudiantes chilenos que necesitan:
- Acceso centralizado a herramientas educativas
- Gestión eficiente de su tiempo académico
- Colaboración con compañeros
- Personalización de su experiencia

**Estado actual**: ✅ Funcional y listo para distribución

**Próximo paso**: Pruebas con usuarios reales y feedback

---

**Desarrollado con ❤️ para estudiantes chilenos**

Versión 1.0.0 | 2025
