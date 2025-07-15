export const listTasksDoc = {
  "/tasks": {
    get: {
      tags: ["Tasks"],
      summary: "List all tasks",
      description: "Retrieves all tasks from the system.",
      operationId: "listTasks",
      responses: {
        200: {
          description: "List of tasks retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      format: "uuid",
                      example: "a4d5e1f2-9a2b-4e7a-95d9-12e3456789ab",
                    },
                    title: {
                      type: "string",
                      example: "Buy groceries",
                    },
                    description: {
                      type: "string",
                      example: "Milk, Eggs, Bread, Butter",
                    },
                    completed: {
                      type: "boolean",
                      example: false,
                    },
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
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/HttpError" },
              example: {
                statusCode: 500,
                message: "Internal server error",
                details: [],
              },
            },
          },
        },
      },
    },
  },
};
