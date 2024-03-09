import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

import { users } from "../User/UserEntity.js";

export const sessions = sqliteTable("sessions", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  expiresOn: integer("expires_on", { mode: "timestamp_ms" })
    .$defaultFn(() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d;
    })
    .notNull(),
  userId: integer("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
});

export type User = typeof users.$inferSelect;

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}));
