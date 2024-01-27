import "dotenv";

import startServer from "./server.js";

try {
  startServer();
} catch (e) {
  console.error(e);
  process.exit(1);
}
