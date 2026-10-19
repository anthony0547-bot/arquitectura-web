# Arquitectura Desacoplada

Sitio web educativo e interactivo para conocer los fundamentos de la arquitectura desacoplada, comparar componentes acoplados y desacoplados, consultar un video explicativo y responder un cuestionario de seis preguntas.

El contenido también presenta al creador del sitio, **Anthony Quinatoa Tapia**, estudiante de Software de Latacunga.

## 🚀 Cómo ejecutar en GitHub Codespaces

1. Abre este repositorio en GitHub Codespaces.
2. Instala la extensión **Live Server** en VS Code, o abre una terminal en la carpeta del proyecto y ejecuta:

   ```bash
   python -m http.server 8000
   ```

3. Con Live Server, haz clic derecho en `index.html` y selecciona **Open with Live Server**. El servidor utiliza el puerto 5500 configurado en `.vscode/settings.json`.
4. Si el preview no se abre automáticamente, ve a la pestaña **Ports** de Codespaces y abre el puerto **5500** (Live Server) o **8000** (Python). Para compartir el sitio, cambia la visibilidad del puerto a **Public**; de lo contrario, déjalo en **Private**.

No se requiere `npm install` ni un proceso de compilación. Bootstrap, Bootstrap Icons y la fuente Poppins se cargan desde CDN, por lo que hace falta conexión a internet para esos recursos externos.

## 🎥 Cómo agregar el video

1. Copia tu archivo de video y guárdalo como `assets/video/video.mp4`.
2. Opcionalmente, coloca una imagen llamada `poster.jpg` en `assets/img/` para usarla como portada del reproductor.
3. Recarga la página. Si el video no está disponible, el sitio mostrará un mensaje indicando dónde añadirlo.

## 🎨 Cómo personalizar colores y contenido

- Edita las variables CSS al principio de [`css/styles.css`](css/styles.css), como `--color-blue`, `--color-navy` y `--color-soft-blue`, para ajustar la paleta.
- Modifica las secciones de texto, los enlaces y la información del autor en [`index.html`](index.html).
- Edita el arreglo `questions` al principio de [`js/app.js`](js/app.js) para cambiar las preguntas. `respuestaCorrecta` es el índice de la opción correcta, empezando por `0`.
- Sustituye `assets/img/fotoperfil.png` por la foto que quieras mostrar y conserva el nombre del archivo o actualiza su ruta en `index.html`.

## 📁 Estructura del proyecto

```text
arquitectura-desacoplada/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── video/
│   │   └── .gitkeep
│   └── img/
│       └── fotoperfil.png
├── .vscode/
│   └── settings.json
├── .gitignore
└── README.md
```

Añade `video.mp4` y, si quieres, `poster.jpg` en sus carpetas respectivas; esos archivos multimedia no se incluyen en el repositorio.

## 🛠️ Tecnologías usadas

- HTML5 semántico y accesible.
- CSS3 responsive, variables de tema, animaciones y `IntersectionObserver`.
- JavaScript vanilla para el cuestionario, la detección del video y la interfaz.
- Bootstrap 5 y Bootstrap Icons vía jsDelivr CDN.
- Google Fonts: Poppins.
