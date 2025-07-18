// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Roelcode";
export const SITE_DESCRIPTION =
  "¡Bienvenido a Roelcode! Tu sitio web de desarrollo web y programación.";

// Funciones para manejar categorías de cursos
export function formatCategorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function getCategoryUrl(category: string): string {
  return `/cursos-udemy/categoria/${formatCategorySlug(category)}`;
}

export function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    todos: "Todos los Cursos",
    popular: "Cursos Populares",
    nuevos: "Cursos Nuevos",
    javaScript: "JavaScript",
    python: "Python",
    go: "Go (Golang)",
    java: "Java",
    html: "HTML",
    css: "CSS",
    tailwind: "TailwindCSS",
    flask: "Flask",
    web: "Desarrollo Web",
    backend: "Backend",
    programing: "Programación",
    a1: "Nivel Básico",
  };

  return (
    titles[category] || category.charAt(0).toUpperCase() + category.slice(1)
  );
}
