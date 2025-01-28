import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const courseCollection = defineCollection ({
    loader: glob({ base: './src/content/courses', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        image: image(),
        popular: z.boolean(),
        new: z.boolean(),
        url: z.string(),
        qualification: z.number(),
        qualifications: z.string(),
        hours: z.number(),
        class: z.number(),
        price: z.string(),
        discount: z.string(),
        tag: z.array(z.string()),
    }),
});

const tutorialCollections = defineCollection({
	loader: glob({ base: './src/content/tutorials', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
        author: reference('authors'),
		updatedDate: z.coerce.date().optional(),
		image: image(),
		video: z.string().optional(),
		tag: z.array(z.string()).optional(),
	}),
});

const authorCollection = defineCollection({
    loader: glob({ pattern: '**/[^_]*.yml', base: "./src/content/authors" }),
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

export const collections = {
	courses: courseCollection, 
	tutorials: tutorialCollections,
    authors: authorCollection,
 };
