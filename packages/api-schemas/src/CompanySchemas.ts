import { z } from "zod";

export const companySchema = z.object({
  id: z.string().uuid(),
  createdOn: z.coerce.date(),
  updatedOn: z.coerce.date(),
  name: z.string().min(2).max(20),
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
export type CompanySchema = z.infer<typeof companySchema>;

export const createCompanyBodySchema = companySchema.omit({
  id: true,
  createdOn: true,
  updatedOn: true,
  location: true,
});
export type CreateCompanyBodySchema = z.infer<typeof createCompanyBodySchema>;

export const createCompanyResponseSchema = z.object({ id: z.string().uuid() });
export type CreateCompanyResponseSchema = z.infer<
  typeof createCompanyResponseSchema
>;

export const getCompanyParamsSchema = z.object({ id: z.string().uuid() });
export type GetCompanyParamsSchema = z.infer<typeof getCompanyParamsSchema>;

export const getCompanyResponseSchema = companySchema.omit({
  createdOn: true,
  updatedOn: true,
  location: true,
});
export type GetCompanyResponseSchema = z.infer<typeof getCompanyResponseSchema>;
