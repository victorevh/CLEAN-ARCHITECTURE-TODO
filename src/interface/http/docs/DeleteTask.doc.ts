export const deleteTaskDoc = {
  "/tasks/{id}": {
    delete: {
      tags: ["Tasks"],
      summary: "Delete a task by ID",
      description: "Deletes the task identified by the given ID.",
      operationId: "deleteTask",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "UUID of the task to delete",
          schema: {
            type: "string",
            format: "uuid",
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
        },
      ],
      responses: {
        204: {
          description: "Task deleted successfully. No content returned.",
        },
        400: {
          description: "Bad Request - Invalid or missing ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/HttpError" },
              example: {
                statusCode: 400,
                message: "Task ID is required.",
                details: [],
              },
            },
          },
        },
        404: {
          description: "Not Found - Task not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/HttpError" },
              example: {
                statusCode: 404,
                message: "Task not found",
                details: [],
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
