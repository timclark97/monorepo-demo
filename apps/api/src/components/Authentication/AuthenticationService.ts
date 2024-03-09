import { db, users, sessions } from "@/lib/database.js";

export const createAccount = async ({
  firstName,
  lastName
}: {
  firstName: string;
  lastName: string;
}) => {
  const [user] = await db
    .insert(users)
    .values({ firstName, lastName })
    .returning();

  const [session] = await db
    .insert(sessions)
    .values({ userId: user.id })
    .returning();

  return { user, session };
};
