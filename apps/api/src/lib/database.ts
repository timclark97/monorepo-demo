import { drizzle } from "drizzle-orm/better-sqlite3";
import Sqlite from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { users, userRelations } from "@/components/User/UserEntity.js";
import {
  sessions,
  sessionRelations
} from "@/components/Session/SessionEntity.js";

const sqlite = new Sqlite(":memory:");

const db = drizzle(sqlite, {
  schema: { users, userRelations, sessionRelations, sessions }
});

migrate(db, { migrationsFolder: "migrations" });

export { db, users, sessions };
