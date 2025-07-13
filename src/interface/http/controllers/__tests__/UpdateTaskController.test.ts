import { UpdateTaskController } from "@interface/http/controllers/UpdateTaskController";
import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";
import type { IUpdateTaskUseCase } from "@application/use-cases/update-task/IUpdateTaskUseCase";

describe("UpdateTaskController", () => {
  let updateTaskUseCaseMock: jest.Mocked<IUpdateTaskUseCase>;
  let controller: UpdateTaskController;

  beforeEach(() => {
    updateTaskUseCaseMock = {
      execute: jest.fn(),
    };
    controller = new UpdateTaskController(updateTaskUseCaseMock);
  });

  it("should return 204 when update is successful", async () => {
    updateTaskUseCaseMock.execute.mockResolvedValue();

    const httpRequest: IHttpRequest = {
      params: { id: "task-id-123" },
      body: { title: "Updated title" },
      query: {},
    };

    const httpResponse: IHttpResponse = await controller.handle(httpRequest);

    expect(updateTaskUseCaseMock.execute).toHaveBeenCalledWith("task-id-123", {
      title: "Updated title",
    });
    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toBeNull();
  });

  it("should return 400 if no task id is provided", async () => {
    const httpRequest: IHttpRequest = {
      params: {},
      body: { title: "Updated title" },
      query: {},
    };

    const httpResponse = await controller.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({
      status: 400,
      message: "Task ID is required.",
    });
    expect(updateTaskUseCaseMock.execute).not.toHaveBeenCalled();
  });

  it("should return error status and message when use case throws", async () => {
    const error = new Error("Update failed");
    updateTaskUseCaseMock.execute.mockRejectedValue(error);

    const httpRequest: IHttpRequest = {
      params: { id: "task-id-123" },
      body: { title: "Updated title" },
      query: {},
    };

    const httpResponse = await controller.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({
      status: 400,
      message: "Update failed",
    });
  });
});
