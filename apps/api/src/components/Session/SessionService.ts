import AppError from "@/lib/AppError.js";
import { db } from "@/lib/database.js";

export const verifySession = async (sessionId: number) => {
  const session = await db.query.sessions.findFirst({
    where: (s, { eq }) => eq(s.id, sessionId),
    with: { user: true }
  });
  if (!session) {
    throw new AppError("Unauthorized", 401);
  }

  if (session.expiresOn < new Date()) {
    throw new AppError("Session expired", 401);
  }

  return session;
};
