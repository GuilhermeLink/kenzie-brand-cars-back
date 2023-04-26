import * as express from "express";
import { iUserRequest } from "../../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      token?: {
        id: string;
        admin: boolean;
        user: iUserRequest;
      };
    }
  }
}
