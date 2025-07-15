export const completeTaskDoc = {
  "/tasks/{id}/complete": {
    post: {
      tags: ["Tasks"],
      summary: "Mark a task as complete",
      description: "Marks the task with the given ID as completed.",
      operationId: "completeTask",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "The ID of the task to mark as complete",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      responses: {
        204: {
          description: "Task marked as completed successfully",
        },
        400: {
          description: "Bad Request - Invalid or missing ID",
        },
        404: {
          description: "Task not found",
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },
  },
};
