import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

const origins = defineCollection({
  // Ensure we explicitly match .json files only to prevent silent missing data bugs
  loader: glob({ pattern: "*.json", base: "./src/content/origins" }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    elevation: z.string(),
    bioregion: z.string(),
    coordinates: z.string(),
    rainfall: z.string(),
    soil: z.string(),
    community: z.object({
      description: z.string(),
      verified: z.boolean().default(false),
      verifiedDetail: z.string().optional()
    }),
    method: z.string(),
    images: z.object({
      canopy: z.string(),
      land: z.string(),
      hand: z.string(),
      isPlaceholderImagery: z.boolean()
    })
  }).superRefine((data, ctx) => {
    // Structural Safeguard: Prevent unverified community names from entering the build
    if (!data.community.verified) {
      const expectedDescription = `Indigenous farming communities, ${data.name}`;
      if (data.community.description !== expectedDescription) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['community', 'description'],
          message: `Unverified community description MUST be exactly: "${expectedDescription}"`
        });
      }
    }
  })
});

const products = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/products" }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    botanicalName: z.string(),
    originSlug: reference('origins'),
    batchRef: z.string(),
    harvestMonth: z.string(),
    sizes: z.array(
      z.object({
        label: z.string(),
        priceINR: z.number().positive(),
        isPriceVerified: z.boolean().default(false)
      })
    ).min(1),
    methodDescription: z.string()
  })
});

export const collections = { origins, products };
