import { z } from "zod";

export const notFoundResponseSchema = z.object({
  message: z.string()
});
export type NotFoundResponseSchema = z.infer<typeof notFoundResponseSchema>;
