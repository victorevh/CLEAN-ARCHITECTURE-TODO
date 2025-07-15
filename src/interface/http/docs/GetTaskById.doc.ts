export const getTaskByIdDoc = {
  "/tasks/{id}": {
    get: {
      tags: ["Tasks"],
      summary: "Get a task by ID",
      description: "Returns a single task by its unique identifier.",
      operationId: "getTaskById",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "The UUID of the task to retrieve",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      responses: {
        200: {
          description: "Task retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    example: "a4d5e1f2-9a2b-4e7a-95d9-12e3456789ab",
                  },
                  title: { type: "string", example: "Buy groceries" },
                  description: {
                    type: "string",
                    example: "Milk, Eggs, Bread, Butter",
                  },
                  completed: { type: "boolean", example: false },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-07-14T18:25:43.511Z",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-07-14T18:30:00.000Z",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request - Missing or invalid ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/HttpError" },
            },
          },
        },
        404: {
          description: "Task not found",
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
