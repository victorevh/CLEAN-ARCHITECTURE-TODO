export const createTaskDoc = {
  "/tasks": {
    post: {
      tags: ["Tasks"],
      summary: "Create a new task",
      description: "Creates a new task with the given title and description.",
      operationId: "createTask",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title"],
              properties: {
                title: {
                  type: "string",
                  example: "Buy groceries",
                  description: "Title of the task",
                },
                description: {
                  type: "string",
                  example: "Milk, eggs, bread",
                  description: "Optional description of the task",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Task created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    example: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
                  },
                  title: { type: "string", example: "Buy groceries" },
                  description: { type: "string", example: "Milk, eggs, bread" },
                  completed: { type: "boolean", example: false },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-07-15T10:00:00Z",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-07-15T10:00:00Z",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request - Invalid input",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/HttpError" },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/HttpError" },
            },
          },
        },
      },
    },
  },
};
