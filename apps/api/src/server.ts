import { randomUUID } from "crypto";
import Fastify from "fastify";
import fastifySwaggerUI from "@fastify/swagger-ui";
import FastifySwagger from "@fastify/swagger";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from "fastify-type-provider-zod";
import { fromZodError } from "zod-validation-error";
import type { ApiError } from "api-schemas";

import UserRoutes from "@/components/User/UserRoutes.js";
import AppError from "@/lib/AppError.js";
import { logger } from "@/lib/logger.js";

declare module "fastify" {
  interface FastifyRequest {
    sessionId: string;
  }
}

const server = Fastify({ logger, genReqId: () => randomUUID() });

// Zod validation
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// Error handling
server.setErrorHandler((e: unknown, req, reply) => {
  if (e instanceof ZodError) {
    return reply.code(400).send({
      statusCode: 400,
      errorType: "application_error",
      message: fromZodError(e, {
        prefix: "",
        prefixSeparator: ""
      }).toString()
    } satisfies ApiError);
  }
  if (e instanceof AppError) {
    return reply.code(e.httpCode).send({
      statusCode: e.httpCode,
      errorType: "application_error",
      message: e.message
    } satisfies ApiError);
  }
  req.log.error(e);
  return reply.code(500).send({
    statusCode: 500,
    errorType: "internal_server_error",
    message: "An unknown error has occurred"
  } satisfies ApiError);
});

// API Documentation Generation
server.register(FastifySwagger, {
  swagger: {
    info: {
      title: "Demo API",
      description: "A demo API",
      version: "1.0.0"
    },
    securityDefinitions: {
      ApiKeyHeader: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    },
    security: [{ ApiKeyHeader: [] }]
  },
  transform: jsonSchemaTransform
});

server.register(cors, {
  credentials: true,
  allowedHeaders: "*",
  methods: ["POST", "GET"]
});

// Routes

// Public routes
server.register(fastifySwaggerUI, {
  prefix: "/docs"
});

// Private routes
server.register(async function (f) {
  f.decorateRequest("sessionId", null);
  f.addHook("onRequest", async (request) => {
    console.log(request.raw.headers.cookie);
    const { authorization } = request.raw.headers;
    if (!authorization) {
      throw new AppError("Unauthorized", 401);
    }
    request.sessionId = authorization;
  });

  f.register(UserRoutes, { prefix: "/users" });
});

const startServer = async () => {
  try {
    await server.listen({ port: 5001 });
    logger.info("Server running. See API docs http://localhost:5001/docs");
  } catch (e) {
    logger.fatal(e);
    logger.fatal("Failed to start server. Terminating process.");
  }
};

export default startServer;
