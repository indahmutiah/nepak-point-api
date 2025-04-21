import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/token";
import {
  LoginResponseSchema,
  LoginUserSchema,
  RegisterUserSchema,
  UserSchema,
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
        content: { "application/json": { schema: UserSchema } },
        description: "Successfully registered user",
      },
    },
  }),
  async (c) => {
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
