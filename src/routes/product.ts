import { prisma } from "@/lib/prisma";
import { cors } from "hono/cors";
import { createRoute } from "@hono/zod-openapi";
import { ProductsSchema } from "@/modules/product/schema";
import { OpenAPIHono } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";

const app = new OpenAPIHono();

export const productRoutes = app;
app.use(cors());

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
    request: {
      query: z.object({
        q: z.string().optional().describe("Search query"),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              total: z.number().describe("Total number of products"),
              data: ProductsSchema,
            }),
          },
        },
        description: "Search Results",
      },
    },
  }),
  async (c) => {
    try {
      const q = c.req.query("q");
      const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
          where: q ? { name: { contains: q, mode: "insensitive" } } : {},
          include: { category: true },
        }),
        prisma.product.count({
          where: q ? { name: { contains: q, mode: "insensitive" } } : {},
        }),
      ]);

      return c.json({
        total: totalCount,
        data: products,
      });
    } catch (error) {
      throw new Error("Failed to search products");
    }
  }
);

// Get product by slug
// app.openapi(
//   createRoute({
//     method: "get",
//     path: "/products/{slug}",
//     description: "Get all products by slug",
//     request: {
//       params: z.object({
//         slug: z.string().describe("Slug of the product"),
//       }),
//     },
//     responses: {
//       200: {
//         content: {
//           "application/json": {
//             schema: ProductsSchema,
//           },
//         },
//         description: "Successfully Get Product by Slug",
//       },
//     },
//   }),
//   async (c) => {
//     const { slug } = c.req.valid(`param`);
//     const product = await prisma.product.findUnique({
//       where: {
//         slug: slug.toLowerCase(),
//       },
//       include: { category: true },
//     });

//     if (product) {
//       const formattedProduct = {
//         ...product,
//         createdAt: product.createdAt.toISOString(),
//         updateAt: product.updateAt.toISOString(),
//         category: product.category
//           ? {
//               ...product.category,
//               createdAt: product.category.createdAt.toISOString(),
//               updateAt: product.category.updateAt.toISOString(),
//             }
//           : null,
//       };
//       return c.json(formattedProduct);
//     }

//     return c.json(null);
//   }
// );

// The OpenAPI documentation
