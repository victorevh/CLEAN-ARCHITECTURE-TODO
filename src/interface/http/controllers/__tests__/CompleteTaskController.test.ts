import { CompleteTaskController } from "@interface/http/controllers/CompleteTaskController";
import { CompleteTaskUseCase } from "@application/use-cases/complete-task/CompleteTaskUseCase";
import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";

describe("CompleteTaskController", () => {
  let completeTaskUseCaseMock: Pick<CompleteTaskUseCase, "execute">;
  let controller: CompleteTaskController;

  beforeEach(() => {
    completeTaskUseCaseMock = {
      execute: jest.fn(),
    };
    controller = new CompleteTaskController(
      completeTaskUseCaseMock as CompleteTaskUseCase
    );
  });

  it("should return 204 on successful completion", async () => {
    (completeTaskUseCaseMock.execute as jest.Mock).mockResolvedValue(undefined);

    const httpRequest: IHttpRequest = {
      params: { id: "123" },
      body: {},
      query: {},
    };

    const httpResponse: IHttpResponse = await controller.handle(httpRequest);

    expect(completeTaskUseCaseMock.execute).toHaveBeenCalledWith("123");
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
    (completeTaskUseCaseMock.execute as jest.Mock).mockRejectedValue(error);

    const httpRequest: IHttpRequest = {
      params: { id: "123" },
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
