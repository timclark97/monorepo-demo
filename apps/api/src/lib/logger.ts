import { pino } from "pino";

export const logger =
  process.env.NODE_ENV === "development"
    ? pino({
        level: "error",
        transport: { target: "pino-pretty" }
      })
    : pino({
        redact: ["req.headers.authorization"]
      });
