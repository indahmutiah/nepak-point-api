import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message:
      " Hi! 👋 This is a REST API for Dexeption's e-commerce personal project.",
  });
});

export default app;
