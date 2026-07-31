import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const originsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/origins" }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    elevation: z.string(),
    bioregion: z.string(),
    coordinates: z.string(),
    rainfall: z.string().optional(),
    soil: z.string().optional(),
    community: z.object({
      description: z.string(),
      verified: z.boolean().default(false),
    }).optional(),
    method: z.string().optional(),
    images: z.object({
      canopy: z.string().optional(),
      land: z.string().optional(),
      hand: z.string().optional(),
      specimen: z.string().optional(),
      isPlaceholderImagery: z.boolean().default(false),
    }),
    narrative: z.object({
      canopy: z.string().optional(),
      land: z.string().optional(),
      hand: z.string().optional(),
    }).optional(),
  }),
});

const productsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/products" }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    botanicalName: z.string().optional(),
    originSlug: z.string(),
    batchRef: z.string().optional(),
    isAnchorProduct: z.boolean().default(false).optional(),
    sizes: z.array(
      z.object({
        label: z.string(),
        priceINR: z.number(),
        isPriceVerified: z.boolean().default(true).optional(),
      })
    ),
    methodDescription: z.string().optional(),
    harvestMonth: z.string().optional(),
    specimenCopy: z.string().optional(),
    images: z.object({
      packaging: z.string().optional(),
      product: z.string().optional(),
    }),
    sensoryProfile: z.object({
      aroma: z.string().optional(),
      flavor: z.string().optional(),
      appearance: z.string().optional(),
    }).optional(),
    chemistry: z.object({
      activeCompound: z.string().optional(),
      moistureContent: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  origins: originsCollection,
  products: productsCollection,
};
