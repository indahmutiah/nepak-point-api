import { z } from "zod";

export const QuerySchema = z.object({
  q: z.string().optional().describe("Search query"),
});

export const ParamSlugSchema = z.object({
  slug: z.string().describe("Search query"),
});
