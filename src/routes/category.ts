import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

export const categoryRoutes = app;

// Get all categories
app.get("/", async (c) => {
  const categories = await prisma.category.findMany();
  const totalCount = await prisma.category.count();
  return c.json({
    total: totalCount,
    data: categories,
  });
});

app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const resultCategory = await prisma.category.findUnique({
    where: {
      slug: slug.toLowerCase(),
    },
    include: {
      products: true,
    },
  });
  const totalCount = await prisma.category.count({
    where: {
      slug: slug.toLowerCase(),
    },
  });

  if (!resultCategory) {
    return c.json({ Message: "Category not found" }, 404);
  }
  return c.json({
    total: totalCount,
    data: resultCategory,
  });
});
