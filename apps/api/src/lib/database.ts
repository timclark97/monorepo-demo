import { drizzle } from "drizzle-orm/better-sqlite3";
import Sqlite from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { users } from "@/components/User/UserEntity.js";

const sqlite = new Sqlite(":memory:");

const db = drizzle(sqlite, { schema: { users } });

migrate(db, { migrationsFolder: "migrations" });

export { users, db };
