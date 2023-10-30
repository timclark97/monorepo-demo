import type { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { randomUUID } from "crypto";
import {
  createCompanyBodySchema,
  createCompanyResponseSchema,
  getCompanyParamsSchema,
  getCompanyResponseSchema,
  notFoundResponseSchema,
} from "api-schemas";

import Company from "./CompanyEntity";
import CompanyEventEmitter from "./CompanyEvents";

const CompanyRoutes: FastifyPluginAsync = async (f) => {
  f.withTypeProvider<ZodTypeProvider>()
    .route({
      method: "POST",
      url: "/",
      schema: {
        body: createCompanyBodySchema,
        response: {
          201: createCompanyResponseSchema,
        },
      },
      handler: async (req, res) => {
        const id = randomUUID();
        await Company.insert({ id, ...req.body });
        CompanyEventEmitter.emit("company-created", { id, ...req.body });
        res.status(201).send({ id });
      },
    })
    .route({
      method: "GET",
      url: "/:id",
      schema: {
        params: getCompanyParamsSchema,
        response: {
          200: getCompanyResponseSchema,
          404: notFoundResponseSchema,
        },
      },
      handler: async (req, res) => {
        const [company] = await Company.find({ where: { id: req.params.id } });
        if (!company) {
          return res.status(404).send({ message: "Company not found" });
        }
        res.send(company);
      },
    });
};

export default CompanyRoutes;
