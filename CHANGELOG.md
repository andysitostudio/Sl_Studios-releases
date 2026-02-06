# Changelog

Todos los cambios notables de Sl Studio serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [v2.000024372.2] - 2025-02-05

### 🎉 Lanzamiento Inicial

#### Añadido
- ✨ Sistema de registro y autenticación completo
  - Formulario de registro con validación
  - Sistema de login con PIN de seguridad
  - CAPTCHAs simples para prevenir spam
  - Sesiones persistentes (auto-login)
  
- 🚀 Launcher de aplicaciones
  - 23 aplicaciones de Microsoft 365
  - 19 aplicaciones de Google Workspace
  - 4 herramientas educativas adicionales
  - 4 asistentes de IA integrados
  
- 📅 Gestión de horarios
  - Crear y editar horarios de clases
  - Registrar pruebas y exámenes
  - Sistema de prioridades (Alta/Media/Baja)
  - Calendario visual
  
- 👥 Sistema de cursos colaborativos
  - Crear grupos de estudio
  - Códigos únicos para unirse
  - Compartir horarios entre miembros
  
- 🎨 Sistema de personalización
  - 24 temas de color predefinidos
  - 3 modos de fondo (Oscuro/Claro/Sistema)
  - Interfaz futurista estilo Opera GX
  
- 🔒 Seguridad y privacidad
  - Cifrado bcrypt para contraseñas y PINs
  - Base de datos SQLite local
  - Cumplimiento con Ley 19.628 de Chile
  - Políticas de privacidad en español
  
- 🔄 Sistema de actualizaciones automáticas
  - Verificación automática al iniciar
  - Botón manual de verificación
  - Descarga e instalación asistida
  - Logs de actualización
  
- 📱 Interfaz de usuario
  - Barra de título personalizada
  - Sidebar de navegación
  - Animaciones suaves
  - Responsive design
  
- 📦 Instalador para Windows
  - Instalador NSIS completo
  - Opción de elegir directorio
  - Creación de accesos directos
  - Versión portable incluida

#### Detalles Técnicos
- Framework: Electron 28.0.0
- Base de datos: SQLite (better-sqlite3)
- Cifrado: bcryptjs
- Auto-updater: electron-updater
- Plataforma: Windows 10/11 (64-bit)

#### Archivos
- `Sl.Studio.Setup.v2.000024372.2.exe` - Instalador completo
- `Sl.Studio.v2.000024372.2.exe` - Versión portable

---

## Formato de Versiones

Este proyecto usa el formato de versionado: `MAJOR.BUILD.PATCH`

- **MAJOR**: Versión principal (cambios mayores)
- **BUILD**: Número de compilación único
- **PATCH**: Correcciones y mejoras menores

---

## Tipos de Cambios

- **Añadido** - Para nuevas características
- **Cambiado** - Para cambios en funcionalidades existentes
- **Deprecated** - Para funcionalidades que serán removidas
- **Removido** - Para funcionalidades removidas
- **Corregido** - Para corrección de bugs
- **Seguridad** - Para mejoras de seguridad
