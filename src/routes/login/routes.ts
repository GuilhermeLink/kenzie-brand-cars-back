import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validated";
import { schemaLogin } from "../../schemas/user";
import { createLoginController } from "../../controllers/user/login";

export const loginRoutes = Router();

loginRoutes.post(
  "",
  validateSchemaMiddleware(schemaLogin),
  createLoginController
);
