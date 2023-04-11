import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validated";
import { createAnnounceController } from "../../controllers/announce/create";
import { authValidationMiddleware } from "../../middlewares/auth";
import { schemaCreateAnnounce } from "../../schemas/announce";

export const announceRoutes = Router();

announceRoutes.post(
  "",
  authValidationMiddleware,
  validateSchemaMiddleware(schemaCreateAnnounce),
  createAnnounceController
);
