import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20)
});
export type UserSchema = z.infer<typeof userSchema>;

export const createUserBodySchema = userSchema.omit({
  id: true
});
export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

export const createUserResponseSchema = userSchema;
export type CreateUserResponseSchema = z.infer<typeof createUserResponseSchema>;

export const getUserParamsSchema = z.object({ id: z.coerce.number() });
export type GetUserParamsSchema = z.infer<typeof getUserParamsSchema>;

export const getUserResponseSchema = userSchema;
export type GetUserResponseSchema = z.infer<typeof getUserResponseSchema>;

export const searchUsersQuerySchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional()
});
export type SearchUsersQuerySchema = z.infer<typeof searchUsersQuerySchema>;

export const searchUsersResponseSchema = z.array(userSchema);
export type SearchUsersResponseSchema = z.infer<
  typeof searchUsersResponseSchema
>;
