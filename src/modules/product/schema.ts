import { z } from "@hono/zod-openapi";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  series: z.string().nullable(),
  description: z.string().nullable(),
  price: z.number(),
  stock: z.number().nullable(),
  imageUrl: z.string(),
  categoryId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductsSchema = z.array(ProductSchema);
