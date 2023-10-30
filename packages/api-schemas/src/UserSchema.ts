import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  createdOn: z.coerce.date(),
  updatedOn: z.coerce.date(),
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  zipCode: z.string(),
  stateId: z.string().length(2),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()).length(2).or(z.array(z.never()).length(0)),
  }),
});
export type UserSchema = z.infer<typeof userSchema>;

export const createUserBodySchema = userSchema.omit({
  id: true,
  createdOn: true,
  updatedOn: true,
  location: true,
});
export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

export const createUserResponseSchema = z.object({ id: z.string().uuid() });
export type CreateUserResponseSchema = z.infer<typeof createUserResponseSchema>;

export const getUserParamsSchema = z.object({ id: z.string().uuid() });
export type GetUserParamsSchema = z.infer<typeof getUserParamsSchema>;

export const getUserResponseSchema = userSchema.omit({
  createdOn: true,
  updatedOn: true,
  location: true,
});
export type GetUserResponseSchema = z.infer<typeof getUserResponseSchema>;
