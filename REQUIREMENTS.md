# 📋 Requerimientos del Proyecto - Web Personal `Roel Code`

REQUIREMENTS.md

## 🎯 Objetivo Principal

Desarrollar una web personal para compartir y promocionar cursos de Udemy con una interfaz moderna y responsive.

## 🏗️ Estructura de Páginas

### 1. **Página de Inicio** (`/`)

- Hero section con presentación personal
- Estadísticas (Experiencia ,cursos, estudiantes, calificaciones)
- Tecnologías (HTML, CSS, Tailwind CSS, JavaScript, Python, Flask, Java, Go)
- Resumen de cursos destacados
- Call-to-action para explorar cursos
- Testimonios o reseñas
- Redes sociales (GitHub, YouTube, Facebook, TikTok)

### 2. **Página de Cursos** (`/cursos`)

- Hero de cursos
- Grid de todos los cursos disponibles
- Filtros por categoría/tecnología
- Búsqueda de cursos
- Cards con información del curso:
  - Imagen del curso
  - Título y descripción
  - Calificación y número de estudiantes
  - Precio y descuentos
  - Enlace a Udemy
- Testimonios o reseñas

### 3. **Página de Contacto** (`/contacto`)

- Hero de Contacto
- Formas de contactar para soporte de los cursos (Udemy, Facebook, WhatsApp)
- Formulario de contacto
- Información de contacto
- Sección de redes sociales (GitHub, YouTube, Facebook, TikTok)

### 4. **Página Acerca de** (`/acerca-de`)

- Hero de Acerca de
- Biografía personal
- Mi Experiencia (Educación, Experiencia y Estudiantes)
- Tecnologías que dominas
- Mis Especialidades (Frontend Development, Backend Development, Otras Tecnologías)
- Misión y visión como instructor (Mi Filosofía de Enseñanza)
- Sección de redes sociales (GitHub, YouTube, Facebook, TikTok)

## 🛠️ Stack Tecnológico

- **Backend**: Python, Flask, Java, Go
- **Frontend**: Astro 5.x, Tailwind CSS 4, TypeScript
- **Base de Datos**: MongoDB, PostgreSQL, MySQL
- **Hosting y VPS**: Netlify, Hostinger, GitHub Pages, DigitalOcean
- **Iconos**: Usando iconos de `icons/` cons `bun astro add astro-icon` para usar `import { Icon } from 'astro-icon/components'` y `<Icon name="name-icon" />`

### Frontend

- **Framework**: Astro 5.x (ya configurado)
- **Estilos**: Tailwind CSS 4
- **Lenguaje**: TypeScript
- **Iconos**: Usando iconos de `icons/` cons `bun astro add astro-icon` para usar `import { Icon } from 'astro-icon/components'` y `<Icon name="name-icon" />`

### Funcionalidades Adicionales

- **SEO**: Meta tags optimizados
- **Performance**: Imágenes optimizadas
- **Responsive**: Mobile-first design
- **Accesibilidad**: WCAG 2.1 AA

## 🎨 Componentes Necesarios

### Layout y Navegación

- `Header.astro` - Navegación principal
  - Logo
  - Menú
  - Para selecionar el modo oscuro (Sitema, Claro y Oscuro)
  - Redes sociales
- `Footer.astro` - Pie de página
- `Layout.astro` - Layout base (actualizar el existente)

### Componentes de cursos `components/courses/`

- `CourseCard.astro` - Tarjeta individual de curso
- `CourseGrid.astro` - Grid de cursos
- `CourseFilter.astro` - Filtros de búsqueda

### Componentes de utils `components/utils/`

- `Button.astro` - Botones reutilizables
- `Badge.astro` - Etiquetas de tecnologías
- `ContactForm.astro` - Formulario de contacto
- `TestimonialCard.astro` - Tarjeta de testimonio
- `SocialLinks.astro` - Enlaces sociales (Github, Facebook, Youtube, Tiktok)
- `StatsCard.astro` - Tarjeta de estadísticas
- `ModeToggle.astro` - Botón para cambiar entre modo claro y oscuro
- `ThemeProvider.astro` - Proveedor de temas para cambiar entre modo claro y oscuro

### Componentes Generales `components/sections/`

- `CourseHighlight.astro` - Cursos destacados
- `TestimonialGrid.astro` - Grid de testimonios
- `TechGrid.astro` - Grid de tecnologías
- `StatsGrid.astro` - Grid de estadísticas
- `SocialGrid.astro` - Grid sección de redes sociales

## 📱 Diseño Responsive

- **Mobile**: -768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: 1280px+

## 🔧 Configuración Requerida

### Dependencias a Instalar

- Proyecto de astro echo
- Instalar Tailwind CSS 4
- Instalar Astro Icon
- Colores principales:
  - Fondo: slate-100 y en dark mode slate-900
  - Texto: black o slate-950 y en dark mode white o slate-50
  - Botones: emerald-500
  - Hover: emerald-600
  - Links: emerald-500
  - Borders: emerald-500

## 📊 Estructura de Datos

- **Curso (TypeScript Interface)**: En la dirección de `src/data/udemy-courses.ts` se encuentra el archivo TypeScript con los datos de los cursos.
- **Testimonios (TypeScript Interface)**: En la dirección de `src/data/testimonials.ts` se encuentra el archivo TypeScript con los datos de los testimonios.
- **Redes Sociales (TypeScript Interface)**: En la dirección de `src/data/social-links.ts` se encuentra el archivo TypeScript con los datos de las redes sociales.
- **Estadísticas (TypeScript Interface)**: En la dirección de `src/data/stats.ts` se encuentra el archivo TypeScript con los datos de las estadísticas.
- **Tecnologías (TypeScript Interface)**: En la dirección de `src/data/tech-stack.ts` se encuentra el archivo TypeScript con los datos de las tecnologías.

## 🎯 Funcionalidades Específicas

### Integración con Udemy

- Enlaces directos a cursos
- Sincronización de datos de cursos

### SEO y Marketing

- Meta tags dinámicos por página
- Open Graph para redes sociales
- Schema markup para cursos
- Sitemap automático

## 📈 Métricas y Analytics

- Google Analytics 4
- Tracking de clics a Udemy
- Formulario de contacto

## 🚀 Fases de Desarrollo

### Fase 1: Configuración Base

1. Instalar y configurar Tailwind CSS 4
2. Instalar o agregar una fuente (Iter Variable)
3. Crear estructura de carpetas
4. Configurar TypeScript interfaces

### Fase 2: Layout y Navegación

1. Crear Header con navegación
2. Actualizar Layout base
3. Crear Footer

### Fase 3: Páginas Principales

1. Rediseñar página de inicio
2. Crear página de cursos
3. Crear página acerca de
4. Crear página de contacto

### Fase 4: Optimización

1. SEO y meta tags
2. Performance optimization
3. Testing responsive
4. Accesibilidad

## 📝 Notas de Desarrollo

### Estructura de Carpetas Propuesta

```
src/
  components/
    courses/
    utils/
    sections/
  data/
    udemy-courses.ts
    testimonials.ts
    social-links.ts
    stats.ts
    tech-stack.ts
  layouts/
    Layout.astro
  pages/
    index.astro
    cursos.astro
    acerca-de.astro
    contacto.astro
```
