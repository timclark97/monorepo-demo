import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

import { users } from "../User/UserEntity.js";

export const sessions = sqliteTable("sessions", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" }).references(() => users.id),
  expiresOn: integer("expires_on", { mode: "timestamp_ms" })
});

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users)
}));

export type Session = typeof sessions.$inferSelect;
