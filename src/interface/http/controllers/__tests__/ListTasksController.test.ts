import { ListTasksController } from "@interface/http/controllers/ListTasksController";
import { ListTasksUseCase } from "@application/use-cases/list-tasks/ListTasksUseCase";
import type { IHttpRequest } from "@interface/http/protocols/IHttpRequest";
import type { IHttpResponse } from "@interface/http/protocols/IHttpResponse";

describe("ListTasksController", () => {
  let listTasksUseCaseMock: Pick<ListTasksUseCase, "execute">;
  let controller: ListTasksController;

  beforeEach(() => {
    listTasksUseCaseMock = {
      execute: jest.fn(),
    };
    controller = new ListTasksController(
      listTasksUseCaseMock as ListTasksUseCase
    );
  });

  it("should return 200 and tasks list", async () => {
    const mockTasks = [
      {
        id: "1",
        title: "Task 1",
        description: "desc",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Task 2",
        description: "desc",
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    (listTasksUseCaseMock.execute as jest.Mock).mockResolvedValue(mockTasks);

    const httpRequest: IHttpRequest = {
      params: {},
      body: {},
      query: {},
    };

    const httpResponse: IHttpResponse = await controller.handle(httpRequest);

    expect(listTasksUseCaseMock.execute).toHaveBeenCalled();
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(mockTasks);
  });

  it("should return error status and message when use case throws", async () => {
    const error = new Error("Database error");
    (listTasksUseCaseMock.execute as jest.Mock).mockRejectedValue(error);

    const httpRequest: IHttpRequest = {
      params: {},
      body: {},
      query: {},
    };

    const httpResponse = await controller.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({
      status: 400,
      message: "Database error",
    });
  });
});
