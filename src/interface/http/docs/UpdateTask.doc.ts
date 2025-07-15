export const updateTaskDoc = {
  "/tasks/{id}": {
    patch: {
      tags: ["Tasks"],
      summary: "Update a task",
      description: "Updates an existing task with the provided fields.",
      operationId: "updateTask",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "UUID of the task to update",
          schema: {
            type: "string",
            format: "uuid",
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Updated task title",
                },
                description: {
                  type: "string",
                  example: "Updated description",
                },
                completed: {
                  type: "boolean",
                  example: true,
                },
              },
              additionalProperties: false,
              minProperties: 1,
            },
          },
        },
      },
      responses: {
        204: {
          description: "Task updated successfully. No content returned.",
        },
        400: {
          description: "Bad Request - No valid fields or invalid ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/HttpError" },
              example: {
                statusCode: 400,
                message: "At least one field must be provided to update.",
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
