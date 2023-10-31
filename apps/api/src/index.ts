import { config } from "dotenv";
config();

import db from "./lib/database";
import startServer from "./server";

db.initialize()
  .then(() => {
    startServer();
  })
  .catch((e) => {
    console.error(e);
    console.error("Failed to connect to database");
    process.exit(1);
  });
