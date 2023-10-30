import {
  CreateUserBodySchema,
  CreateUserResponseSchema,
  GetUserParamsSchema,
} from "api-schemas";

import apiFetcher from "./apiFetcher";

export const createUser = async (body: CreateUserBodySchema) =>
  apiFetcher<CreateUserResponseSchema>({
    path: "/users",
    method: "POST",
    body,
  });

export const getUser = async (params: GetUserParamsSchema) =>
  apiFetcher<CreateUserResponseSchema>({
    path: `/users/${params.id}`,
    method: "GET",
  });
