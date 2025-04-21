import { prisma } from "@/lib/prisma";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { CategoriesSchema, CategorySchema } from "@/modules/category/schema";
import { ParamSlugSchema } from "@/modules/common/schema";

const app = new OpenAPIHono();

export const categoryRoutes = app;

// Get all categories
app.openapi(
  createRoute({
    method: "get",
    path: "/",
    description: "Get all Categories",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: CategoriesSchema,
          },
        },
        description: "Get all categories",
      },
    },
  }),
  async (c) => {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    return c.json(categories);
  }
);

// Get category by slug
app.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    description: "Get category by slug",
    request: { params: ParamSlugSchema },
    responses: {
      200: {
        content: { "application/json": { schema: CategorySchema } },
        description: "Successfully get category by slug",
      },
      404: {
        description: "Category not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: true,
      },
    });
    if (!category) {
      return c.notFound();
    }
    return c.json(category);
  }
);
