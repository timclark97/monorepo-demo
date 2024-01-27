import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

import { sessions } from "../Session/SessionEntity.js";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  firstName: text("first_name").default("").notNull(),
  lastName: text("last_name").default("").notNull()
});

export type User = typeof users.$inferSelect;

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions)
}));
