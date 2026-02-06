# 📝 COMANDOS GIT RÁPIDOS

## Inicializar y Subir por Primera Vez

```bash
# 1. Navegar a la carpeta del proyecto
cd sl-studio

# 2. Inicializar Git (si no está inicializado)
git init

# 3. Agregar repositorio remoto
git remote add origin https://github.com/andysitostudio/Sl_Studios-releases.git

# 4. Verificar el remoto
git remote -v

# 5. Agregar todos los archivos
git add .

# 6. Hacer el primer commit
git commit -m "feat: lanzamiento inicial Sl Studio v2.000024372.2"

# 7. Cambiar a rama main (si es necesario)
git branch -M main

# 8. Subir al repositorio
git push -u origin main
```

---

## Actualizar el Repositorio

```bash
# 1. Ver qué archivos han cambiado
git status

# 2. Agregar archivos específicos
git add archivo.js

# O agregar todos los cambios
git add .

# 3. Hacer commit con mensaje descriptivo
git commit -m "fix: corregir bug en horarios"

# 4. Subir cambios
git push
```

---

## Crear un Release

### Opción 1: Desde GitHub (Recomendado)

1. Ve a: https://github.com/andysitostudio/Sl_Studios-releases
2. Click en "Releases"
3. Click en "Create a new release"
4. Tag: `v2.000024372.2`
5. Título: `Sl Studio v2.000024372.2`
6. Arrastra los archivos .exe
7. Click en "Publish release"

### Opción 2: Desde Línea de Comandos

```bash
# 1. Crear un tag
git tag -a v2.000024372.2 -m "Release v2.000024372.2"

# 2. Subir el tag
git push origin v2.000024372.2

# 3. Luego ve a GitHub y sube los archivos .exe manualmente
```

---

## Comandos Útiles

```bash
# Ver historial de commits
git log --oneline

# Ver cambios antes de commit
git diff

# Ver ramas
git branch

# Deshacer cambios en un archivo (cuidado!)
git checkout -- archivo.js

# Ver estado del repositorio
git status

# Actualizar desde GitHub
git pull

# Clonar el repositorio
git clone https://github.com/andysitostudio/Sl_Studios-releases.git
```

---

## Solución de Problemas

### Error: "Permission denied"

```bash
# Genera un Personal Access Token en GitHub
# Settings → Developer settings → Personal access tokens
# Luego usa el token como contraseña
```

### Error: "fatal: remote origin already exists"

```bash
# Elimina el remoto existente
git remote remove origin

# Agrega el nuevo
git remote add origin https://github.com/andysitostudio/Sl_Studios-releases.git
```

### Error: "refusing to merge unrelated histories"

```bash
# Si el repositorio remoto ya tiene archivos
git pull origin main --allow-unrelated-histories
```

---

## Flujo de Trabajo Típico

1. **Hacer cambios** en el código
2. **Probar** localmente (`npm start`)
3. **Ver cambios**: `git status`
4. **Agregar**: `git add .`
5. **Commit**: `git commit -m "descripción"`
6. **Push**: `git push`
7. **Si es nueva versión**:
   - Actualizar version en package.json
   - `npm run build:win`
   - Crear release en GitHub
   - Subir archivos .exe

---

## .gitignore

Archivos que NO se suben a GitHub:

```
node_modules/
dist/
*.log
*.db
*.db-journal
.DS_Store
Thumbs.db
```

---

**Guía rápida para Sl Studio**
