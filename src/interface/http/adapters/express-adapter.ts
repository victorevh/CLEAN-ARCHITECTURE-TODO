import { Request, Response } from "express";
import type { IController } from "@interface/http/protocols/IController";

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    console.log(`[AdaptRoute] Handling ${req.method} ${req.path}`);
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: Object.fromEntries(
        Object.entries(req.query).map(([key, value]) => [key, String(value)])
      ),
    };

    const httpResponse = await controller.handle(httpRequest);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
