class SocialLink {
  name: string;
  url: string;
  icon: string;
  description: string;

  constructor(name: string, url: string, icon: string, description: string) {
    this.name = name;
    this.url = url;
    this.icon = icon;
    this.description = description;
  }
}

export const socialLinks = [
  new SocialLink(
    "GitHub",
    "https://github.com/alexroel",
    "github",
    "Explora mi código fuente, proyectos open source y descubre en qué estoy trabajando actualmente. Aquí encontrarás repositorios de desarrollo web, aplicaciones y herramientas de programación."
  ),
  new SocialLink(
    "YouTube",
    "https://www.youtube.com/@roelcode",
    "youtube",
    "Únete a mi canal para acceder a tutoriales gratuitos, cursos completos de programación y las últimas novedades en tecnología. Contenido educativo sobre desarrollo web, lenguajes de programación y frameworks modernos."
  ),
  new SocialLink(
    "Facebook",
    "https://www.facebook.com/alexroelcode",
    "facebook",
    "Sígueme para estar al día con mis proyectos, novedades y contenido exclusivo. Comparto regularmente cupones de descuento para mis cursos de Udemy, incluyendo ofertas de hasta 100% de descuento."
  ),
  new SocialLink(
    "TikTok",
    "https://www.tiktok.com/@roelcode",
    "tiktok",
    "Descubre contenido rápido y dinámico sobre programación, tips de desarrollo, trucos de código y las tendencias más actuales en el mundo tech. Aprende programación de forma entretenida y visual."
  ),
];
