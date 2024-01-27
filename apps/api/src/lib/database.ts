import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { users } from "@/components/User/UserEntity.js";

const sqlite = new Database(":memory:");

export { users };

export const db = drizzle(sqlite, { schema: { users } });

migrate(db, { migrationsFolder: "migrations" });
