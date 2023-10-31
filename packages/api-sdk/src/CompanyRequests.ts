import {
  CreateCompanyBodySchema,
  CreateCompanyResponseSchema,
  GetCompanyParamsSchema,
  GetCompanyResponseSchema,
} from "api-schemas";

import apiFetcher from "./apiFetcher";

export const createCompany = async (body: CreateCompanyBodySchema) =>
  apiFetcher<CreateCompanyResponseSchema>({
    path: "/companies",
    method: "POST",
    body,
  });

export const getCompany = async (params: GetCompanyParamsSchema) =>
  apiFetcher<GetCompanyResponseSchema>({
    path: `/companies/${params.id}`,
    method: "GET",
  });
