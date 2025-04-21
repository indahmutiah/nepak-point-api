import { z } from "@hono/zod-openapi";

export const PrivateUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PrivateUser = z.infer<typeof PrivateUserSchema>;

export const PublicUserSchema = PrivateUserSchema.omit({
  email: true,
});

export const PublicUsersSchema = z.array(PublicUserSchema);

export const RegisterUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().nullable(),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
});
