import { createTaskDoc } from "@interface/http/docs/CreateTask.doc";
import { completeTaskDoc } from "@interface/http/docs/CompleteTask.doc";
import { getTaskByIdDoc } from "@interface/http/docs/GetTaskById.doc";
import { deleteTaskDoc } from "@interface/http/docs/DeleteTask.doc";
import { listTasksDoc } from "@interface/http/docs/ListTasks.doc";
import { updateTaskDoc } from "./docs/UpdateTask.doc";

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
    "/tasks": {
      ...createTaskDoc["/tasks"],
      ...listTasksDoc["/tasks"],
    },
    "/tasks/{id}/complete": {
      ...completeTaskDoc["/tasks/{id}/complete"],
    },
    "/tasks/{id}": {
      ...getTaskByIdDoc["/tasks/{id}"],
      ...updateTaskDoc["/tasks/{id}"],
      ...deleteTaskDoc["/tasks/{id}"],
    },
  },
};

export default swaggerSpec;
