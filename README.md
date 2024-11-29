# Roelcode website

Este es el sitio web de Roelcode, una página personal donde comparto mis cursos de Udemy, tutoriales, artículos y más.

## 🚀 Estructura del proyecto 

Este proyecto está construido con [Astro](https://astro.build), un marco de trabajo moderno para la creación de sitios web. 

Dentro de tu proyecto Astro, verás las siguientes carpetas y archivos:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro busca archivos `.astro` o `.md` en el directorio `src/pages/`. Cada página se expone como una ruta basada en su nombre de archivo.

No hay nada especial en `src/components/`, pero ahí es donde nos gusta poner cualquier componente de Astro/React/Vue/Svelte/Preact.

El directorio `src/content/` contiene "colecciones" de documentos relacionados en Markdown y MDX. Utiliza `getCollection()` para recuperar publicaciones de `src/content/blog/`, y verifica el tipo de tu metadatos utilizando un esquema opcional. Consulta la [documentación de Astro sobre colecciones de contenido](https://docs.astro.build/en/guides/content-collections/) para obtener más información.

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

- `bun install` - Instala las dependencias
- `bun run dev` - Inicia el servidor de desarrollo local en `localhost:4321`
- `bun run build` - Construye tu sitio de producción en `./dist/`
- `bun run preview` - Previsualiza tu construcción localmente, antes de implementar.
- `bun run astro ...` - Ejecuta comandos de la CLI como `astro add`, `astro check`
- `bun run astro -- --help` - Obtén ayuda usando la CLI de Astro

## 👀 ¿Quieres aprender más?

Consulta [nuestra documentación](https://docs.astro.build) o únete a nuestro [servidor de Discord](https://astro.build/chat).


