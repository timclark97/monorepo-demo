import { z } from "zod";

export const registerBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string()
});
export type RegisterBodySchema = z.infer<typeof registerBodySchema>;

export const registerResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string()
  }),
  session: z.object({
    id: z.number()
  })
});
export type RegisterResponseSchema = z.infer<typeof registerResponseSchema>;
