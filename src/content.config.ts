import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
   loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
   schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      visible: z.boolean().default(false),
   }),
});

const projects = defineCollection({
   loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/projects" }),
   schema: ({ image }) =>
      z.object({
         title: z.string(),
         description: z.string(),
         image: image(),
         client: z.object({ logo: image(), name: z.string() }),
         date: z.date(),
         visible: z.boolean().default(false),
      }),
});

const companies = defineCollection({
   loader: file("./src/data/companies/companies.json"),
   schema: ({ image }) =>
      z.object({
         name: z.string(),
         logo: image(),
         website: z.string(),
      }),
});
export const collections = { blog, projects, companies };
