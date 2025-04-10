import { prisma } from "@/lib/prisma";
import { cors } from "hono/cors";
import { createRoute } from "@hono/zod-openapi";
import { ProductSchema, ProductsSchema } from "@/modules/product/schema";
import { OpenAPIHono } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";
import { ParamSlugSchema, QuerySchema } from "@/modules/common/schema";

const app = new OpenAPIHono();

export const productRoutes = app;

// Get all products
app.openapi(
  createRoute({
    method: "get",
    path: "/",
    description: "Get all products",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: ProductsSchema,
          },
        },
        description: "Get all products",
      },
    },
  }),
  async (c) => {
    const products = await prisma.product.findMany();
    const formattedProducts = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updateAt: product.updateAt.toISOString(),
    }));
    return c.json(formattedProducts);
  }
);

// Get products by search
app.openapi(
  createRoute({
    method: "get",
    path: "/search",
    description: "Get all products by search",
    request: { query: QuerySchema },
    responses: {
      200: {
        content: { "application/json": { schema: ProductsSchema } },
        description: "Search Results",
      },
    },
  }),
  async (c) => {
    try {
      const { q } = c.req.valid("query");
      const products = await prisma.product.findMany({
        where: q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { slug: { contains: q, mode: "insensitive" } },
                { series: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        include: { category: true },
      });

      return c.json(products);
    } catch (error) {
      throw new Error("Failed to search products");
    }
  }
);

// Get product by slug
app.openapi(
  createRoute({
    method: "get",
    path: "/products/{slug}",
    description: "Get product by slug",
    request: { params: ParamSlugSchema },
    responses: {
      200: {
        content: { "application/json": { schema: ProductSchema } },
        description: "Successfully get product by slug",
      },
      404: {
        description: "Product not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!product) {
      return c.notFound();
    }

    return c.json(product);
  }
);
