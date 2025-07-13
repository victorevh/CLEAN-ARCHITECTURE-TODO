import { GetTaskByIdController } from "@interface/http/controllers/GetTaskByIdController";
import { GetTaskByIdUseCase } from "@application/use-cases/get-task-by-id/GetTaskByIdUseCase";
import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";

describe("GetTaskByIdController", () => {
  let getTaskByIdUseCaseMock: Pick<GetTaskByIdUseCase, "execute">;
  let controller: GetTaskByIdController;

  beforeEach(() => {
    getTaskByIdUseCaseMock = {
      execute: jest.fn(),
    };
    controller = new GetTaskByIdController(
      getTaskByIdUseCaseMock as GetTaskByIdUseCase
    );
  });

  it("should return 200 and task when found", async () => {
    const mockTask = {
      id: "task-id-123",
      title: "Test Task",
      description: "Description",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (getTaskByIdUseCaseMock.execute as jest.Mock).mockResolvedValue(mockTask);

    const httpRequest: IHttpRequest = {
      params: { id: "task-id-123" },
      body: {},
      query: {},
    };

    const httpResponse: IHttpResponse = await controller.handle(httpRequest);

    expect(getTaskByIdUseCaseMock.execute).toHaveBeenCalledWith("task-id-123");
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(mockTask);
  });

  it("should return 400 if id param is missing", async () => {
    const httpRequest: IHttpRequest = {
      params: {},
      body: {},
      query: {},
    };

    const httpResponse = await controller.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({
      status: 400,
      message: "Task ID is required.",
    });
  });

  it("should return error status and message when use case throws", async () => {
    const error = new Error("Something went wrong");
    (getTaskByIdUseCaseMock.execute as jest.Mock).mockRejectedValue(error);

    const httpRequest: IHttpRequest = {
      params: { id: "task-id-123" },
      body: {},
      query: {},
    };

    const httpResponse = await controller.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({
      status: 400,
      message: "Something went wrong",
    });
  });
});
