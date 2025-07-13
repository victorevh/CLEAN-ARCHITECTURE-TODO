import { Request, Response } from "express";
import { IController } from "../protocols/IController";

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const httpResponse = await controller.handle(httpRequest);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
