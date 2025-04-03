import { Hono } from "hono";
import { productRoutes } from "@/routes/product";
import { categoryRoutes } from "@/routes/category";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message:
      " Hi! 👋 This is a REST API for Nepak Point's e-commerce personal project.",
  });
});

app.route("/products", productRoutes);
app.route("/categories", categoryRoutes);

export default app;
