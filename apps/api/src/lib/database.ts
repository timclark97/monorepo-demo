import { drizzle } from "drizzle-orm/better-sqlite3";
import Sqlite from "better-sqlite3";

import { users } from "@/components/User/UserEntity.js";

const sqlite = new Sqlite(":memory:");

const db = drizzle(sqlite, { schema: { users } });

export { users, db };
