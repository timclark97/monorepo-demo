import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  firstName: text("first_name").default("").notNull(),
  lastName: text("last_name").default("").notNull()
});

export type User = typeof users.$inferSelect;
