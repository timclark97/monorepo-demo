import { z } from "zod";

import { getUserResponseSchema } from "./UserSchemas";

export const matchSchema = z.object({
  id: z.string().uuid(),
  createdOn: z.coerce.date(),
  updatedOn: z.coerce.date(),
  userId: z.string().uuid(),
  companyId: z.string().uuid(),
});
export type MatchSchema = z.infer<typeof matchSchema>;

export const listMatchesParamsSchema = z.object({
  companyId: z.string().uuid(),
});
export type ListMatchesParamsSchema = z.infer<typeof listMatchesParamsSchema>;

export const listMatchesResponseSchema = z.array(
  matchSchema
    .omit({ updatedOn: true, userId: true, companyId: true })
    .merge(z.object({ user: getUserResponseSchema }))
);
export type ListMatchesResponseSchema = z.infer<
  typeof listMatchesResponseSchema
>;

export const getMatchParamsSchema = z.object({
  companyId: z.string().uuid(),
  matchId: z.string().uuid(),
});
export type GetMatchParamsSchema = z.infer<typeof getMatchParamsSchema>;

export const getMatchResponseSchema = matchSchema
  .omit({ updatedOn: true, userId: true, companyId: true })
  .merge(z.object({ user: getUserResponseSchema }));
export type GetMatchResponseSchema = z.infer<typeof getMatchResponseSchema>;
