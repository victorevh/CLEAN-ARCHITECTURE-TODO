import { DeleteTaskController } from "@interface/http/controllers/DeleteTaskController";
import { DeleteTaskUseCase } from "@application/use-cases/delete-task/DeleteTaskUseCase";
import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";

describe("DeleteTaskController", () => {
  let deleteTaskUseCaseMock: Pick<DeleteTaskUseCase, "execute">;
  let controller: DeleteTaskController;

  beforeEach(() => {
    deleteTaskUseCaseMock = {
      execute: jest.fn(),
    };
    controller = new DeleteTaskController(deleteTaskUseCaseMock as DeleteTaskUseCase);
  });

  it("should return 204 on successful deletion", async () => {
    (deleteTaskUseCaseMock.execute as jest.Mock).mockResolvedValue(undefined);

    const httpRequest: IHttpRequest = {
      params: { id: "abc123" },
      body: {},
      query: {},
    };

    const httpResponse: IHttpResponse = await controller.handle(httpRequest);

    expect(deleteTaskUseCaseMock.execute).toHaveBeenCalledWith("abc123");
    expect(httpResponse.statusCode).toBe(204);
    expect(httpResponse.body).toBeNull();
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

  it("should return error status and message on use case failure", async () => {
    const error = new Error("Failure");
    (deleteTaskUseCaseMock.execute as jest.Mock).mockRejectedValue(error);

    const httpRequest: IHttpRequest = {
      params: { id: "abc123" },
      body: {},
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
