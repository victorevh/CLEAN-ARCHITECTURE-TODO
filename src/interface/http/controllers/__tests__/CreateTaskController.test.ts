import { CreateTaskController } from "@interface/http/controllers/CreateTaskController";
import { CreateTaskUseCase } from "@application/use-cases/create-task/CreateTaskUseCase";
import { CreateTaskDTO } from "@application/use-cases/create-task/CreateTaskDTO";
import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";

describe("CreateTaskController", () => {
  let createTaskUseCaseMock: Pick<CreateTaskUseCase, "execute">;
  let controller: CreateTaskController;

  beforeEach(() => {
    createTaskUseCaseMock = {
      execute: jest.fn(),
    };
    controller = new CreateTaskController(
      createTaskUseCaseMock as CreateTaskUseCase
    );
  });

  it("should return 201 and created task on success", async () => {
    const fakeTask = { id: "1", title: "Test task" };
    (createTaskUseCaseMock.execute as jest.Mock).mockResolvedValue(fakeTask);

    const httpRequest: IHttpRequest = {
      body: { title: "Test task" } as CreateTaskDTO,
      params: {},
      query: {},
    };

    const httpResponse: IHttpResponse = await controller.handle(httpRequest);

    expect(createTaskUseCaseMock.execute).toHaveBeenCalledWith(
      httpRequest.body
    );
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual(fakeTask);
  });

  it("should return error status code and message on failure", async () => {
    const error = new Error("Failure");
    (createTaskUseCaseMock.execute as jest.Mock).mockRejectedValue(error);

    const httpRequest: IHttpRequest = {
      body: { title: "Test task" } as CreateTaskDTO,
      params: {},
      query: {},
    };

    const httpResponse = await controller.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({
      status: 400,
      message: "Failure",
    });
  });
});
