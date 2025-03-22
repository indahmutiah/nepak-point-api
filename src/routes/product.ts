import { Hono } from "hono";
import { dataProducts } from "@/data/product";
import { prisma } from "@/lib/prisma";

const app = new Hono();

export const productRoutes = app;
app.get("/", async (c) => {
  const products = await prisma.product.findMany();
  return c.json(products);
});
