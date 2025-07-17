import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Para cursos udemy
const udemyCourses = defineCollection({
  loader: glob({ base: "./src/content/udemy", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      popular: z.boolean(),
      new: z.boolean(),
      qualification: z.number(),
      qualifications: z.string(),
      hours: z.number(),
      class: z.number(),
      price: z.string(),
      discount: z.string(),
      url: z.string().url(),
      tag: z.array(z.string()),
    }),
});

export const collections = { udemyCourses };
