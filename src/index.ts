import { Hono } from "hono";
import { productRoutes } from "@/routes/product";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message:
      " Hi! 👋 This is a REST API for Nepak Point's e-commerce personal project.",
  });
});

app.route("/api/products", productRoutes);

export default app;
