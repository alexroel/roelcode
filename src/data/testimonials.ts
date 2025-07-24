class Testimonial {
  name: string;
  description: string;
  calification: number;
  userIcon: string;
  iconQuote: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.calification = 5;
    this.userIcon = "user";
    this.iconQuote = "quote";
  }
}

export const testimonials = [
  new Testimonial(
    "Donovan Abraham",
    "Ha sido un gran curso, muy dinámico y práctico."
  ),
  new Testimonial(
    "Alexander Guillin",
    "Excelente curso, la forma sencilla de explicar permite comprender mejor cada tema."
  ),
  new Testimonial(
    "Gilberto Gaytan",
    "Curso 100% recomendado, cumplio con todas mis expectativas!"
  ),
  new Testimonial(
    "Gina paola",
    "Excelente curso, muy bien explicado, fácil de entender, muy claro. Muchas gracias."
  ),
  new Testimonial(
    "Eduardo Andres",
    "En la mayor parte del curso me he encontrado con información desactualizada sobre el lenguaje o incluso sobre las bases de datos, es algo que se debe mejorar."
  ),
  new Testimonial(
    "Edison Alberto",
    "La información es transmitida de una manera clara y concisa. ¡Además es muy dinámico y divertido para explicar!"
  ),
  new Testimonial(
    "Carlos Mario",
    "Llevo poco más de 2 semanas con el curso y he aprendido lo que no aprendí en 2 semestres de la universidad respecto a HTML y CSS."
  ),
  new Testimonial(
    "Yazmin Salazar",
    "Está muy bien explicado, dicen que es Java e indican qué aplicaciones se usan para poder programarlo. Muy buen timbre de voz y entonación."
  ),
];
