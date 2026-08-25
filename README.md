# 🏪 TiendaMiFamilia - Control de Logística y Precios

Aplicación Web y PWA (Progressive Web App) para el equipo interno de logística de **TiendaMiFamilia**. Permite consultar precios de productos en tiempo real, agregar nuevos ítems, modificar precios existentes, eliminar productos y realizar copias de seguridad de los datos.

---

## 🌟 Características Principales

1. **Catálogo Inicial Precargado**: Incluye los 58 productos del inventario base con sus precios en Pesos Colombianos (`$`).
2. **Búsqueda Ultrarrápida**: Filtra al instante por nombre o precio omitiendo tildes o mayúsculas.
3. **Edición y Gestión Completa (CRUD)**:
   - ➕ **Agregar**: Nuevos productos con nombre y precio.
   - ✏️ **Modificar**: Cambiar nombre o actualizar el precio de cualquier producto existente.
   - 🗑️ **Eliminar**: Quitar productos del catálogo con confirmación previa.
4. **Persistencia de Datos**: Los cambios realizados por logística se guardan automáticamente en la memoria local del dispositivo (`localStorage`).
5. **Copia de Seguridad (Exportar / Importar)**:
   - Exporta el inventario completo a **JSON** o **Excel (CSV)**.
   - Importa un respaldo desde otro dispositivo para mantener sincronizados a todos los miembros de logística.
6. **100% Offline**: Funciona en bodegas o zonas sin señal gracias al Service Worker.

---

## 🚀 Cómo Publicar la App Gratis en GitHub Pages (en 2 minutos)

Para que todo el equipo de logística pueda entrar desde su celular mediante un enlace simple:

1. Crea un repositorio en tu cuenta de GitHub (ej. `tienda-mi-familia`).
2. Sube todos los archivos de esta carpeta (`index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js`).
3. En GitHub, ve a **Settings (Configuración)** > **Pages**.
4. En la sección **Source (Fuente)**, selecciona la rama `main` (o `master`) y la carpeta `/ (root)`. Haz clic en **Save (Guardar)**.
5. En unos segundos, GitHub te dará un enlace web como:
   `https://tu-usuario.github.io/tienda-mi-familia/`

---

## 📱 Cómo Instalar la App en el Celular (Opción PWA - Recomendada)

La tecnología PWA (Progressive Web App) te permite instalar la app como si fuera una aplicación nativa descargada de la Play Store, **sin necesidad de archivos APK ni habilitar orígenes desconocidos**:

### En Android (Google Chrome):
1. Abre el enlace de GitHub Pages en Chrome.
2. Toca el botón verde **"Instalar App"** en el encabezado de la página (o abre el menú de 3 puntos de Chrome y selecciona **"Agregar a la pantalla principal"** / **"Instalar aplicación"**).
3. ¡Listo! La app aparecerá en tu menú de aplicaciones con su propio icono de TiendaMiFamilia.

### En iPhone (Safari):
1. Abre el enlace en Safari.
2. Toca el botón **Compartir** (icono de cuadrado con flecha hacia arriba).
3. Selecciona **"Agregar al inicio"** (Add to Home Screen).

---

## 📦 Opción 2: Convertir a Archivo APK para Android

Si prefieres distribuir un archivo instalable `.apk` para instalar directamente en teléfonos Android:

1. Visita la herramienta gratuita **[PWABuilder](https://www.pwabuilder.com/)**.
2. Pega tu enlace de GitHub Pages (`https://tu-usuario.github.io/tienda-mi-familia/`).
3. Haz clic en **"Package for Android"** y luego en **"Download APK / Android Package"**.
4. Te generará el archivo `.apk` listo para enviar por WhatsApp o guardar en una carpeta.
