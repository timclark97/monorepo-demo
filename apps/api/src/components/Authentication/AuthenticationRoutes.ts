import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  registerBodySchema,
  registerResponseSchema,
  apiError
} from "api-schemas";

import { createAccount } from "./AuthenticationService.js";

const AuthenticationRoutes = async (f: FastifyInstance) => {
  f.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/register",
    schema: {
      body: registerBodySchema,
      response: {
        201: registerResponseSchema,
        400: apiError,
        500: apiError
      }
    },
    handler: async (req, res) => {
      const { firstName, lastName } = req.body;
      const { user, session } = await createAccount({ firstName, lastName });
      res.status(201).send({ user, session });
    }
  });
};

export default AuthenticationRoutes;
