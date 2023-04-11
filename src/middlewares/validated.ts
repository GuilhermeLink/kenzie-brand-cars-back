// no comment
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

type Serializer = {
  validate: (data: any, options: object) => Promise<any>;
};

export const validateSchemaMiddleware =
  (serializer: Serializer) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
      next();
    } catch (err: any) {
      if (err.errors) {
        next(new AppError(err.errors, 400));
      } else {
        next(err);
      }
    }
  };
