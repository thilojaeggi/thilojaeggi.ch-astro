import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			client: z.string().optional(),
			year: z.union([z.string(), z.number()]).optional(),
			technologies: z.array(z.object({
				name: z.string(),
				icon: z.string()
			})).optional(),
			links: z.object({
				github: z.string().optional(),
				website: z.string().optional(),
			}).optional(),
			stats: z.array(z.string()).optional(),
			pubDate: z.coerce.date(),
			heroImage: image().optional(),
		}),
});

export const collections = { blog, projects };
