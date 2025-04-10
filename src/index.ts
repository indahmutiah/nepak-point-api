import { productRoutes } from "@/routes/product";
import { categoryRoutes } from "@/routes/category";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";

const app = new OpenAPIHono();
app.use(cors());

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Nepak Point API",
    version: "1.0.0",
  },
});

app.route("/products", productRoutes);
app.route("/categories", categoryRoutes);

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
