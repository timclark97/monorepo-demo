import type { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { randomUUID } from "crypto";
import {
  createUserBodySchema,
  createUserResponseSchema,
  getUserParamsSchema,
  getUserResponseSchema,
  notFoundResponseSchema,
} from "api-schemas";

import User from "./UserEntity";
import UserEventEmitter from "./UserEvents";

const UserRoutes: FastifyPluginAsync = async (f) => {
  f.withTypeProvider<ZodTypeProvider>()
    .route({
      method: "POST",
      url: "/",
      schema: {
        body: createUserBodySchema,
        response: {
          201: createUserResponseSchema,
        },
      },
      handler: async (req, res) => {
        const id = randomUUID();
        await User.insert({ id, ...req.body });
        UserEventEmitter.emit("user-created", { id, ...req.body });
        res.status(201).send({ id });
      },
    })
    .route({
      method: "GET",
      url: "/:id",
      schema: {
        params: getUserParamsSchema,
        response: {
          200: getUserResponseSchema,
          404: notFoundResponseSchema,
        },
      },
      handler: async (req, res) => {
        const [user] = await User.find({ where: { id: req.params.id } });
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
      },
    });
};

export default UserRoutes;
