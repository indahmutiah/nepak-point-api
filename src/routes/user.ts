import { prisma } from "@/lib/prisma";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { PublicUsersSchema, PrivateUserSchema } from "@/modules/user/schema";
import { z } from "@hono/zod-openapi";

export const usersRoutes = new OpenAPIHono();

// Get all users
usersRoutes.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: PublicUsersSchema } },
        description: "Get all users",
      },
    },
  }),
  async (c) => {
    const users = await prisma.user.findMany();
    return c.json(users);
  }
);

// Get user by id
usersRoutes.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    description: "Get user by id",
    request: {
      params: z.object({ id: z.string() }),
    },
    responses: {
      200: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Successfully get user by id",
      },
      404: {
        description: "User not found",
      },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    const category = await prisma.user.findUnique({
      where: { id },
    });
    if (!category) return c.notFound();
    return c.json(category);
  }
);
