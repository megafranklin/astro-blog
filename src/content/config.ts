import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: image().refine(img => img.width < 1200, {
            message: 'Image should be lower 1200px'
        }),

        // Relación
        // author: z.string(),
        author: reference('author'),

        // Relación
        // tags: z.array(z.string()),
        tags: reference('tags'),

        // Boolean
        isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
    type: 'data',
    schema: ({image}) => z.object({
        name: z.string(),
        avatar: image(),
        twitter: z.string(),
        linkedIn: z.string(),
        github: z.string(),
        bio: z.string(),
        subtitle: z.string(),
    }),
});

const tagsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        tags: z.array(z.string()),
    }),
});

export const collections = {
    blog: blogCollection,
    author: authorCollection,
    tags: tagsCollection,
};