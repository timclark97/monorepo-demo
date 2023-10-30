import type { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  getMatchParamsSchema,
  getMatchResponseSchema,
  listMatchesParamsSchema,
  listMatchesResponseSchema,
  notFoundResponseSchema,
} from "api-schemas";

import Match from "./MatchEntity";

const MathRoutes: FastifyPluginAsync = async (f) => {
  f.withTypeProvider<ZodTypeProvider>()
    .route({
      method: "GET",
      url: "/:companyId",
      schema: {
        params: listMatchesParamsSchema,
        response: {
          200: listMatchesResponseSchema,
        },
      },
      handler: async (req, res) => {
        const matches = await Match.find({
          where: {
            companyId: req.params.companyId,
          },
          relations: { user: true },
          order: { createdOn: "ASC" },
        });
        res.send(matches);
      },
    })
    .route({
      method: "GET",
      url: "/:companyId/:matchId",
      schema: {
        params: getMatchParamsSchema,
        response: {
          200: getMatchResponseSchema,
          404: notFoundResponseSchema,
        },
      },
      handler: async (req, res) => {
        const [match] = await Match.find({
          where: {
            companyId: req.params.companyId,
            id: req.params.matchId,
          },
          relations: { user: true },
        });
        if (!match) {
          res.status(404).send({ message: "Match not found" });
        }
        res.send(match);
      },
    });
};

export default MathRoutes;
