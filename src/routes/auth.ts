import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/token";
import { checkAuthorized } from "@/modules/auth/middleware";
import {
  LoginResponseSchema,
  LoginUserSchema,
  RegisterUserSchema,
  PrivateUserSchema,
  PublicUsersSchema,
  PublicUserSchema,
} from "@/modules/user/schema";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";

export const authRoutes = new OpenAPIHono();

// Post Register auth
authRoutes.openapi(
  createRoute({
    method: "post",
    path: "/register",
    description: "Register a new user",
    request: {
      body: {
        content: { "application/json": { schema: RegisterUserSchema } },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: PublicUserSchema } },
        description: "Successfully registered user",
      },
      400: {
        description: "Failed to register user",
      },
    },
  }),
  async (c) => {
    try {
      const body = c.req.valid("json");

      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: { create: { hash: await hashPassword(body.password) } },
          name: body.name,
        },
        omit: {
          email: true,
        },
      });
      return c.json(user);
    } catch (error) {
      return c.json({ message: "Failed to register user", error }, 400);
    }
  }
);

// Post Login auth
authRoutes.openapi(
  createRoute({
    method: "post",
    path: "/login",
    request: {
      body: {
        content: { "application/json": { schema: LoginUserSchema } },
      },
    },
    responses: {
      200: {
        content: { "application/json": { schema: LoginResponseSchema } },
        description: "Successfully logged in",
      },
      404: {
        description: "Failed to login",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      include: { password: true },
    });
    if (!user) {
      return c.json({ message: "User not found" }, 400);
    }
    if (!user.password?.hash) {
      return c.json({ message: "User has not password" }, 400);
    }

    const isValid = await verifyPassword(user.password.hash, body.password);

    if (!isValid) {
      return c.json({ message: "Invalid Password" }, 400);
    }

    const token = generateToken(user.id);

    return c.json({
      token,
    });
  }
);

// Get /auth/me
authRoutes.openapi(
  createRoute({
    method: "get",
    path: "/me",
    description: "Get user info",
    middleware: checkAuthorized,
    responses: {
      200: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Get User Info",
      },
    },
  }),
  async (c) => {
    const user = c.get("user");

    return c.json(user);
  }
);
