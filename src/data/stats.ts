import { udemyCourses } from "@/data/udemy-courses";

class Stats {
  name: string;
  description: string;
  value: number;
  icon: string;

  constructor(name: string, description: string, value: number, icon: string) {
    this.name = name;
    this.description = description;
    this.value = value;
    this.icon = icon;
  }
}

export const stats = [
  // Experiencia
  new Stats(
    "Experiencia",
    "Con más de 8 años de experiencia en el mundo de la tecnología y más de 4 años de experiencia como instructor especializado en desarrollo de software.",
    8,
    "instructor"
  ),
  // Cursos
  new Stats(
    "Cursos",
    `He desarrollado y publicado mas ${udemyCourses.length} cursos especializados, abarcando múltiples tecnologías y lenguajes de programación modernos.`,
    udemyCourses.length,
    "courses"
  ),

  // Estudiantes
  new Stats(
    "Estudiantes en Udemy",
    "He formado a más de 180 Mil estudiantes a través de mis cursos en Udemy, ayudándoles a desarrollar sus habilidades en programación y desarrollo web.",
    180,
    "udemy"
  ),

  // Promedio de Calificación
  new Stats(
    "Promedio de Calificación",
    "Mantengo un promedio de calificación de 4.6 estrellas en mis cursos de Udemy, respaldado por más de 12 Mil reseñas de estudiantes satisfechos.",
    4.6,
    "star"
  ),
];
