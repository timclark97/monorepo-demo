import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  createUserBodySchema,
  createUserResponseSchema,
  getUserParamsSchema,
  getUserResponseSchema,
  apiError,
  searchUsersQuerySchema,
  searchUsersResponseSchema
} from "api-schemas";

import { db, users } from "@/lib/database.js";
import AppError from "@/lib/AppError.js";

import UserEventEmitter from "./UserEvents.js";

const UserRoutes = async (f: FastifyInstance) => {
  f.withTypeProvider<ZodTypeProvider>()
    .route({
      method: "POST",
      url: "/",
      schema: {
        body: createUserBodySchema,
        response: {
          201: createUserResponseSchema,
          400: apiError,
          500: apiError
        }
      },
      handler: async (req, res) => {
        const [user] = await db
          .insert(users)
          .values({ ...req.body })
          .returning();

        UserEventEmitter.emit("user-created", user);
        res.status(201).send(user);
      }
    })
    .route({
      method: "GET",
      url: "/:id",
      schema: {
        params: getUserParamsSchema,
        response: {
          200: getUserResponseSchema,
          404: apiError,
          500: apiError
        }
      },
      handler: async (req, res) => {
        const user = await db.query.users.findFirst({
          where: (user, { eq }) => eq(user.id, req.params.id)
        });
        if (!user) {
          throw new AppError("User not found", 404);
        }
        res.send(user);
      }
    })
    .route({
      method: "GET",
      url: "/search",
      schema: {
        querystring: searchUsersQuerySchema,
        response: {
          200: searchUsersResponseSchema,
          500: apiError
        }
      },
      handler: async (req, res) => {
        const users = await db.query.users.findMany({
          where: (user, { like, or }) =>
            or(
              like(user.firstName, `%${req.query.firstName}%`),
              like(user.lastName, `%${req.query.lastName}%`)
            )
        });
        res.send(users);
      }
    });
};

export default UserRoutes;
