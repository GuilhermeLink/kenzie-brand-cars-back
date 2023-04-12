import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validated";
import { createAnnounceController } from "../../controllers/announce/create";
import { authValidationMiddleware } from "../../middlewares/auth";
import { schemaCreateAnnounce } from "../../schemas/announce";
import { showAnnounceController } from "../../controllers/announce/get";

export const announceRoutes = Router();

announceRoutes.post(
  "",
  authValidationMiddleware,
  validateSchemaMiddleware(schemaCreateAnnounce),
  createAnnounceController
);

announceRoutes.get("", authValidationMiddleware, showAnnounceController);
