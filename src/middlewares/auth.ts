import "dotenv/config";

import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/entities/user";

export const authValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  token = token.replace("Bearer ", "");

  verify(
    token,
    process.env.SECRET_KEY as string,
    async (error, decoded: any) => {
      if (error) {
        return res.status(401).json({ message: "Token invalido" });
      }

      const repository = AppDataSource.getRepository(User);

      const user = await repository.findOneBy({ id: decoded.sub });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.token = {
        id: decoded.sub,
        admin: user.admin,
        user: user,
      };

      next();
    }
  );
};
