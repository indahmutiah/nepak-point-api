import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

export const productRoutes = app;

// Get all products
app.get("/", async (c) => {
  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({ include: { category: true } }),
    prisma.product.count(),
  ]);

  return c.json({
    total: totalCount,
    data: products,
  });
});

// Get products by search
app.get("/search", async (c) => {
  const q = c.req.query("q");

  try {
    const [products, totalCount] = await Promise.all([
      await prisma.product.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        include: { category: true },
      }),

      await prisma.product.count({
        where: { name: { contains: q, mode: "insensitive" } },
      }),
    ]);

    return c.json({
      total: totalCount,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to search products" }, 500);
  }
});

// Get product by slug
app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  const totalCount = await prisma.product.count({
    where: { slug },
  });

  if (!product) {
    return c.json({ Message: "Product not found" }, 404);
  }

  return c.json({
    total: totalCount,
    data: product,
  });
});
