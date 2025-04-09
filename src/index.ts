import { productRoutes } from "@/routes/product";
import { categoryRoutes } from "@/routes/category";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";

const app = new OpenAPIHono(); // Use OpenAPIHono for OpenAPI support
app.use(cors());

// Root endpoint
app.get("/", (c) => {
  return c.json({
    message:
      "Hi! 👋 This is a REST API for Nepak Point's e-commerce personal project.",
  });
});

// OpenAPI documentation for the entire API
app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Nepak Point API",
    version: "1.0.0",
  },
});

app.route("/products", productRoutes);
app.route("/categories", categoryRoutes);

// Swagger UI for OpenAPI documentation
app.get("/docs", Scalar({ url: "/openapi.json" }));

export default app;
