import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { PostgresSource } from "./lib/database";

import UserRoutes from "./components/User/UserRoutes";
import CompanyRoutes from "./components/Company/CompanyRoutes";
import MatchRoutes from "./components/Match/MatchRoutes";

const server = fastify();

// Middleware
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.setErrorHandler((e: any, req, reply) => {
  if (e.name === "ZodError") {
    return reply.code(400).send({
      statusCode: 400,
      error: "Validation Error",
      message: "Invalid Input",
      paths: e.issues,
    });
  }
  if (e.name === "ResponseValidationError") {
    return reply.code(500).send({
      statusCode: 500,
      error: "Data Response Error",
      message: "Unable to construct proper response",
      paths: e.details.issues,
    });
  }
  if (e.name === "AppError") {
    return reply.code(e.httpCode).send({
      statusCode: e.httpCode,
      error: "Application Error",
      message: e.message,
    });
  }
  console.log(e);
  reply.code(500).send({
    statusCode: 500,
    message: "An unknown error has occurred",
    error: "Server Error",
  });
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Beck's Hybrids Demo",
      description: "A demo API for Beck's Hybrids",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

// Routes
server.register(UserRoutes, { prefix: "/users" });
server.register(CompanyRoutes, { prefix: "/companies" });
server.register(MatchRoutes, { prefix: "/matches" });
server.register(fastifySwaggerUI, {
  prefix: "/docs",
});

const startServer = async () => {
  try {
    await PostgresSource.initialize();
    await server.listen({ port: 5001 });
    console.log("Server running. See API docs http://localhost:5001/docs");
  } catch (err) {
    console.error(err);
    console.error("Failed to start server. Terminating process.");
    process.exit(1);
  }
};

export default startServer;
