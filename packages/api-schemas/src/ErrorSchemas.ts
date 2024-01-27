import { z } from "zod";

export const apiError = z.object({
  statusCode: z.number().min(400).max(599),
  errorType: z.enum(["application_error", "internal_server_error"]),
  message: z.string()
});
export type ApiError = z.infer<typeof apiError>;
