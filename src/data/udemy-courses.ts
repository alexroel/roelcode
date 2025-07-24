import imgCurosWeb from "@/assets/udemy-courses/desarrollo-web.jpg";
import imgCursoFlask from "@/assets/udemy-courses/curso-flask.jpg";
import imgCursoGo from "@/assets/udemy-courses/curso-profecional-go.jpg";
import imgCursoGoGuia from "@/assets/udemy-courses/curso-go-guia.jpg";
import imgCursoHtmlCss from "@/assets/udemy-courses/html-css.png";
import imgCursoJava from "@/assets/udemy-courses/curso-java1.jpg";
import imgCursoPython from "@/assets/udemy-courses/curso-completo-python.jpg";
import imgCursoTailwind from "@/assets/udemy-courses/curso-tailwind.png";

export interface UdemyCourse {
  id: string;
  url: string;
  image: ImageMetadata;
  title: string;
  headline: string;
  popular: boolean;
  newCourse: boolean;
  rating: number;
  numReviews: number;
  hours: number;
  numClass: number;
  price: number;
  priceDiscount?: number;
  tag: string[];
}

export const udemyCourses: UdemyCourse[] = [
  {
    id: "programacion-desarrollo-web",
    url: "https://www.udemy.com/course/programacion-desarrollo-web/?couponCode=DEVWEB-RC",
    image: imgCurosWeb,
    title: "Escuela de Programación y Desarrollo Web desde cero a Master",
    headline:
      "Aprende programación y desarrollo Web desde cero con lenguajes HTML, CSS, JavaScript, Python, Go (Golang) y Java.",
    popular: true,
    newCourse: false,
    rating: 4.4,
    numReviews: 1623,
    hours: 74,
    numClass: 720,
    price: 69.99,
    priceDiscount: 12.99,
    tag: [
      "javaScript",
      "a1",
      "programing",
      "web",
      "html",
      "css",
      "python",
      "go",
    ],
  },
  {
    id: "curso-flask",
    url: "https://www.udemy.com/course/curso-flask/?couponCode=FLASKRC",
    image: imgCursoFlask,
    title: "Flask - Construye aplicaciones web profesionales con Python",
    headline:
      "Aprende Flask y conviértete en un desarrollador web experto con habilidades valiosas para el mercado laboral.",
    popular: true,
    newCourse: false,
    rating: 4.7,
    numReviews: 257,
    hours: 10,
    numClass: 107,
    price: 64.99,
    priceDiscount: 12.99,
    tag: ["flask", "python", "a1", "programing", "web", "backend"],
  },
  {
    id: "curso-profecional-go",
    url: "https://www.udemy.com/course/curso-golang/?couponCode=GOPRO-RC",
    image: imgCursoGo,
    title: "Curso profesional de Go - De cero a Master 2024",
    headline:
      "Aprende lenguaje de Go, Desarrollo Web con Go, Manejo de HTML, CSS, API RESTful com MySQL y ORM con Go",
    popular: true,
    newCourse: false,
    rating: 4.7,
    numReviews: 2069,
    hours: 19,
    numClass: 192,
    price: 69.99,
    priceDiscount: 12.99,
    tag: ["go", "a1", "programing", "web", "backend"],
  },
  {
    id: "curso-go-guia",
    url: "https://www.udemy.com/course/cursodego-golang/?couponCode=GOGUIA-RC",
    image: imgCursoGoGuia,
    title: "Aprende Go: La guía completa para dominar Golang",
    headline:
      "Domina los fundamentos y las funciones avanzadas del lenguaje de programación Go (Golang)",
    popular: false,
    newCourse: false,
    rating: 4.5,
    numReviews: 117,
    hours: 11,
    numClass: 102,
    price: 54.99,
    priceDiscount: 12.99,
    tag: ["go", "a1", "programing"],
  },
  {
    id: "curso-html-css",
    url: "https://www.udemy.com/course/html-y-css/?couponCode=HTMLCSS-RC",
    image: imgCursoHtmlCss,
    title: "Curso completo de HTML y CSS, Aprende Flexbox, Grid y BEM",
    headline:
      "Crea sitios web modernos con HTML y CSS, Domina Flexbox, CSS Grid y BEM. Crea diseños responsivos y optimiza con BEM.",
    popular: false,
    newCourse: true,
    rating: 4.9,
    numReviews: 20,
    hours: 27,
    numClass: 194,
    price: 229.9,
    priceDiscount: 12.99,
    tag: ["html", "css", "a1", "web"],
  },
  {
    id: "curso-profesional-java",
    url: "https://www.udemy.com/course/curso-completo-de-java/?couponCode=JAVARC",
    image: imgCursoJava,
    title: "Curso profesional de Java 2024 –De cero a Master",
    headline:
      "Aprende a programar en Java desde cero hasta avanzado como Java SE y inicia el desarrollo web con Java",
    popular: true,
    newCourse: false,
    rating: 4.5,
    numReviews: 934,
    hours: 16,
    numClass: 140,
    price: 229.9,
    priceDiscount: 12.99,
    tag: ["java", "a1", "programing"],
  },
  {
    id: "curso-completo-python",
    url: "https://www.udemy.com/course/curso-completo-de-python-desde-cero-hasta-experto/?couponCode=PYTHONRC",
    image: imgCursoPython,
    title: "Curso completo de Python 2024-De cero a Master con Python 3",
    headline:
      "Desarrollo web con Python3, Flask, Django y conoce todo desde cero SQLite3, HTML, CSS para crear aplicaciones WEB",
    popular: true,
    newCourse: false,
    rating: 4.5,
    numReviews: 2776,
    hours: 36,
    numClass: 343,
    price: 94.99,
    priceDiscount: 12.99,
    tag: ["python", "a1", "programing", "web", "backend"],
  },
  {
    id: "curso-tailwindcss",
    url: "https://www.udemy.com/course/curso-tailwindcss/?couponCode=TAILWINDCSS-RC",
    image: imgCursoTailwind,
    title: "Curso profesional de TailwindCSS V4 desde cero",
    headline:
      "Domina TailwindCSS V4 desde cero y crea interfaces modernas, rápidas y responsivas con la metodología Utility-First.",
    popular: false,
    newCourse: true,
    rating: 4.9,
    numReviews: 50,
    hours: 7,
    numClass: 80,
    price: 84.9,
    priceDiscount: 12.99,
    tag: ["tailwind", "css", "a1", "web"],
  },
];
