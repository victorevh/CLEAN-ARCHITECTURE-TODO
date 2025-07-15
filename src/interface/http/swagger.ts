import { createTaskDoc } from "@interface/http/docs/CreateTask.doc";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Clean Architecture TaskLin API",
    version: "1.0.0",
    description: "Task Management API following Clean Architecture principles.",
    contact: {
      name: "Victor Santos",
      url: "https://www.linkedin.com/in/victor-oliveira-santos-b10bb81ab/",
      email: "victorevh@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      HttpError: {
        type: "object",
        properties: {
          statusCode: { type: "integer", example: 400 },
          message: { type: "string", example: "Invalid input" },
          details: {
            type: "array",
            items: { type: "string" },
            example: ["Field X is required"],
          },
        },
      },
    },
  },
    paths: {
    ...createTaskDoc,
  },
};

export default swaggerSpec;
