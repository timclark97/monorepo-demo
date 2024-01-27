import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/**/**Entity.ts",
  driver: "better-sqlite",
  out: "./migrations"
});
