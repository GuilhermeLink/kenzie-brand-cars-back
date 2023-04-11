import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validated";
import { schemaCreateAccount } from "../../schemas/user";
import { createUserController } from "../../controllers/user/create";

export const userRoutes = Router();

userRoutes.post(
  "",
  validateSchemaMiddleware(schemaCreateAccount),
  createUserController
);
