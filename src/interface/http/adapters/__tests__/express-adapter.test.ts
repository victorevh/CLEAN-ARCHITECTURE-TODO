import { adaptRoute } from "@interface/http/adapters/express-adapter";
import type { IController } from "@interface/http/protocols/IController";
import type { Request, Response } from "express";

describe("adaptRoute", () => {
  it("should call controller.handle with adapted request and send response", async () => {
    const controller: IController = {
      handle: jest.fn().mockResolvedValue({
        statusCode: 200,
        body: { message: "ok" },
      }),
    };

    const req = {
      method: "GET",
      path: "/test",
      body: { foo: "bar" },
      params: { id: "123" },
      query: { search: "abc", page: "1" },
    } as unknown as Request;

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));

    const res = {
      status,
    } as unknown as Response;

    await adaptRoute(controller)(req, res);

    expect(controller.handle).toHaveBeenCalledWith({
      body: req.body,
      params: req.params,
      query: { search: "abc", page: "1" },
    });

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ message: "ok" });
  });
});
