import { RegisterBodySchema, RegisterResponseSchema } from "api-schemas";

import { apiFetcher } from "./apiFetcher.ts";

export const register = async (body: RegisterBodySchema) =>
  apiFetcher<RegisterResponseSchema>({
    method: "POST",
    path: "/register",
    body
  });
