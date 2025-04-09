import { prisma } from "@/lib/prisma";
import { cors } from "hono/cors";
import { createRoute } from "@hono/zod-openapi";
import { ProductsSchema } from "@/modules/product/schema";
import { OpenAPIHono } from "@hono/zod-openapi";

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
// app.openapi(
//   createRoute({
//     method: "get",
//     path: "/products/search",
//     description: "Get all products by search",
//     request: {
//       query: z.object({
//         q: z.string().optional().describe("Search query"),
//       }),
//     },
//     responses: {
//       200: {
//         content: {
//           "application/json": {
//             schema: z.object({
//               total: z.number().describe("Total number of products"),
//               data: ProductsSchema,
//             }),
//           },
//         },
//         description: "Search Results",
//       },
//     },
//   }),
//   async (c) => {
//     try {
//       const q = c.req.query("q");
//       const [products, totalCount] = await Promise.all([
//         prisma.product.findMany({
//           where: q ? { name: { contains: q, mode: "insensitive" } } : {},
//           include: { category: true },
//         }),
//         prisma.product.count({
//           where: q ? { name: { contains: q, mode: "insensitive" } } : {},
//         }),
//       ]);

//       return c.json({
//         total: totalCount,
//         data: products,
//       });
//     } catch (error) {
//       throw new Error("Failed to search products");
//     }
//   }
// );

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
//             schema: ProductResponseSchema,
//           },
//         },
//         description: "Successfully Get Product by Slug",
//       },
//       404: {
//         content: {
//           "application/json": {
//             schema: ProductNotFoundSchema,
//           },
//         },
//         description: "Product not found",
//       },
//     },
//   }),
//   async (c) => {
//     const {slug } = c.req.valid(`param`);
//     const [product, totalCount] = await Promise.all([
//       prisma.product.findUnique({
//         where: {
//           slug: slug.toLowerCase(),
//         },
//         include: {
//           category: true,
//         },
//       }),
//       prisma.product.count({
//         where: {
//           slug: slug.toLowerCase(),
//         },
//       }),
//     ]);

//     if (!product) {
//       return c.json({ message: "Product not found" as const }, 404);
//     }

//     return c.json({
//       total: totalCount,
//       data: product,
//     });
//   }
// );

// The OpenAPI documentation
