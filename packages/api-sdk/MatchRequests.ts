import {
  GetMatchParamsSchema,
  GetMatchResponseSchema,
  ListMatchesParamsSchema,
  ListMatchesResponseSchema,
} from "api-schemas";

import apiFetcher from "./apiFetcher";

export const listMatches = async (params: ListMatchesParamsSchema) =>
  apiFetcher<ListMatchesResponseSchema>({
    path: `/matches/${params.companyId}`,
    method: "GET",
  });

export const getMatches = async (params: GetMatchParamsSchema) =>
  apiFetcher<GetMatchResponseSchema>({
    path: `/matches/${params.companyId}/${params.matchId}`,
    method: "GET",
  });
