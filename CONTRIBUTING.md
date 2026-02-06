# Guía de Contribución

¡Gracias por tu interés en contribuir a Sl Studio! 🎉

## 🐛 Reportar Bugs

Si encontraste un bug, por favor:

1. **Verifica** que no haya un issue similar ya creado
2. **Crea** un nuevo issue usando la plantilla de bug
3. **Incluye**:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Capturas de pantalla (si aplica)
   - Versión de Sl Studio
   - Sistema operativo y versión

### Ejemplo:

```markdown
**Descripción:**
La aplicación se cierra al intentar agregar un horario.

**Pasos para reproducir:**
1. Abrir Sl Studio
2. Ir a "Horarios"
3. Hacer clic en "Agregar Horario/Prueba"
4. Llenar el formulario
5. Hacer clic en "Guardar"

**Esperado:**
El horario se guarda y aparece en la lista.

**Actual:**
La aplicación se cierra inesperadamente.

**Versión:** v2.000024372.2
**SO:** Windows 11 64-bit
```

---

## 💡 Sugerir Mejoras

Para sugerir nuevas características:

1. **Verifica** que no haya una sugerencia similar
2. **Crea** un nuevo issue con la etiqueta "enhancement"
3. **Describe**:
   - ¿Qué problema resuelve?
   - ¿Cómo debería funcionar?
   - ¿Por qué sería útil?

---

## 🔧 Contribuir con Código

### Prerequisitos

- Node.js 16+
- Git
- Conocimientos de JavaScript/Electron
- Windows 10/11 para pruebas

### Configuración del Entorno

```bash
# Fork el repositorio
# Clonar tu fork
git clone https://github.com/TU-USUARIO/Sl_Studios-releases.git
cd Sl_Studios-releases

# Agregar upstream
git remote add upstream https://github.com/andysitostudio/Sl_Studios-releases.git

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

### Proceso de Contribución

1. **Crea una rama** para tu feature
   ```bash
   git checkout -b feature/nombre-descriptivo
   ```

2. **Haz tus cambios**
   - Sigue las convenciones de código existentes
   - Comenta código complejo
   - Prueba tus cambios

3. **Commit tus cambios**
   ```bash
   git add .
   git commit -m "feat: descripción clara del cambio"
   ```

4. **Push a tu fork**
   ```bash
   git push origin feature/nombre-descriptivo
   ```

5. **Crea un Pull Request**
   - Describe claramente los cambios
   - Referencia issues relacionados
   - Incluye capturas si hay cambios visuales

### Convenciones de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nueva característica
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato (no afectan funcionalidad)
- `refactor:` - Refactorización de código
- `test:` - Agregar o modificar tests
- `chore:` - Tareas de mantenimiento

**Ejemplos:**
```
feat: agregar exportación de horarios a PDF
fix: corregir error al eliminar cursos
docs: actualizar guía de instalación
style: mejorar espaciado en formularios
```

---

## 📝 Estilo de Código

### JavaScript

- Usar `const` y `let`, nunca `var`
- Nombres de variables descriptivos en camelCase
- Funciones con nombres claros
- Comentarios para lógica compleja

```javascript
// ✅ Bien
const userName = document.getElementById('user-name');
const scheduleData = {
  title: 'Matemáticas',
  priority: 'alta'
};

// ❌ Mal
var x = document.getElementById('user-name');
const d = { t: 'Matemáticas', p: 'alta' };
```

### CSS

- Usar variables CSS para colores y temas
- BEM o nomenclatura descriptiva
- Mobile-first cuando sea posible

```css
/* ✅ Bien */
.schedule-card {
  background: var(--bg-secondary);
  border-radius: 12px;
}

.schedule-card__title {
  color: var(--primary-color);
}

/* ❌ Mal */
.sc {
  background: #151515;
}
```

### HTML

- Semántico y accesible
- Atributos aria cuando sea necesario
- Estructura clara con indentación

---

## 🧪 Testing

Antes de enviar un PR, asegúrate de que:

- [ ] La aplicación inicia sin errores
- [ ] Puedes registrar un nuevo usuario
- [ ] Puedes iniciar sesión
- [ ] La funcionalidad modificada funciona correctamente
- [ ] No has introducido nuevos bugs
- [ ] El código sigue las convenciones

---

## 📄 Documentación

Si tu cambio afecta:

- **Funcionalidad del usuario**: Actualiza README.md
- **Instalación**: Actualiza INSTALACION.md
- **Nuevas características**: Actualiza CHANGELOG.md

---

## 🚫 Qué NO hacer

- ❌ Hacer cambios sin crear un issue primero
- ❌ Hacer commits directos a `main`
- ❌ Incluir archivos personales o sensibles
- ❌ Cambiar drásticamente la arquitectura sin discusión
- ❌ Agregar dependencias sin justificación

---

## 🎯 Prioridades

Áreas donde más necesitamos ayuda:

1. **Corrección de bugs** reportados
2. **Mejora de UI/UX**
3. **Optimización de rendimiento**
4. **Documentación**
5. **Tests automatizados**

---

## 📞 Preguntas

Si tienes dudas sobre cómo contribuir:

1. Revisa los [Issues existentes](https://github.com/andysitostudio/Sl_Studios-releases/issues)
2. Crea un issue con tu pregunta
3. Contacta al maintainer

---

## 🙏 Agradecimientos

Gracias por contribuir a Sl Studio y ayudar a mejorar la experiencia educativa de estudiantes chilenos. ¡Cada contribución cuenta! 🇨🇱

---

**Código de Conducta:** Esperamos que todos los contribuidores sean respetuosos y profesionales. No se tolerará ningún tipo de acoso o discriminación.
