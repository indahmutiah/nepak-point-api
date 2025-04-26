import { productRoutes } from "@/routes/product";
import { categoryRoutes } from "@/routes/category";
import { usersRoutes } from "@/routes/user";
import { authRoutes } from "@/routes/auth";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { cartRoute } from "./routes/cart";

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
app.route("/users", usersRoutes);
app.route("/auth", authRoutes);
app.route("/cart", cartRoute);
app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
