import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

export const productRoutes = app;

// Get all products
app.get("/", async (c) => {
  const products = await prisma.product.findMany();
  const totalCount = await prisma.product.count();
  return c.json({
    total: totalCount,
    data: products,
  });
});

// Get products by search
app.get("/search", async (c) => {
  const name = c.req.query("name");
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        category: true,
      },
    });
    const totalCount = await prisma.product.count({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    if (products.length === 0) {
      return c.json({ Message: "Product not found" }, 404);
    }

    return c.json({
      total: totalCount,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "An error occurred while searching for products" },
      500
    );
  }
});

// Get product by slug
app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const resultproduct = await prisma.product.findUnique({
    where: {
      slug: slug.toLowerCase(),
    },
    include: {
      category: true,
    },
  });
  const totalCount = await prisma.product.count({
    where: {
      slug: slug,
    },
  });

  if (!resultproduct) {
    return c.json({ Message: "Product not found" }, 404);
  }

  return c.json({
    total: totalCount,
    data: resultproduct,
  });
});
