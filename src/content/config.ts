import { defineCollection, reference, z } from 'astro:content';

const courseCollection = defineCollection ({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        image: image().refine((img) => img.width > 50, {
            message: 'La imagen debe ser de 1200px de ancho',
        }),
        popular: z.boolean(),
        new: z.boolean(),
        url: z.string(),
        qualification: z.number(),
        qualifications: z.string(),
        hours: z.number(),
        class: z.number(),
        tag: z.array(z.string()),
    }),
});

const tutorialCollections = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
        author: reference('authors'),
		updatedDate: z.coerce.date().optional(),
		image: image().refine((img) => img.width > 50, {
            message: 'La imagen debe ser de 1200px de ancho',
        }).optional(),
		video: z.string().optional(),
		tag: z.array(z.string()).optional(),
	}),
});

const authorCollection = defineCollection({
    type: 'data',
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
