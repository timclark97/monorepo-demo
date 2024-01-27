import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./dist/**/**Entity.js",
  driver: "better-sqlite",
  out: "./migrations"
});
