import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const tutorialCollections = defineCollection({
  loader: glob({ base: "./src/content/tutorials", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      author: reference("authors"),
      updatedDate: z.coerce.date().optional(),
      image: image(),
      video: z.string().optional(),
      tag: z.array(z.string()).optional(),
    }),
});

const authorCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.yml", base: "./src/content/authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      facebook: z.string(),
      youtube: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
    }),
});

// Colección para cursos de YouTube (solo archivos index.mdx)
const freeCourseCollection = defineCollection({
  loader: glob({
    base: "./src/content/freecourses",
    pattern: "**/index.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      duration: z.string(),
      level: z.enum(["Principiante", "Intermedio", "Avanzado"]),
      language: z.string(),
      totalLessons: z.number(),
      instructor: reference("authors"),
      youtubePlaylist: z.string(),
      stack: z.array(z.string()),
      categories: z.array(z.string()),
      image: image(),
      learningObjectives: z.array(z.string()),
      sections: z.array(
        z.object({
          title: z.string(),
          slug: z.string(),
          description: z.string(),
          lessons: z.number(),
        })
      ),
    }),
});

// Colección para lecciones de YouTube (solo archivos en subdirectorios de secciones)
const freeLessonCollection = defineCollection({
  loader: glob({
    base: "./src/content/freecourses",
    pattern: "**/0*/**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    videoId: z.string(),
    duration: z.string(),
    order: z.number(),
    section: z.string(),
    course: z.string(),
    previousLesson: z.string().optional(),
    nextLesson: z.string().optional(),
    resources: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
          type: z.enum(["link", "file", "code"]),
        })
      )
      .optional(),
    transcript: z.boolean().optional(),
  }),
});

export const collections = {
  tutorials: tutorialCollections,
  authors: authorCollection,
  freeCourses: freeCourseCollection,
  freeLessons: freeLessonCollection,
};
