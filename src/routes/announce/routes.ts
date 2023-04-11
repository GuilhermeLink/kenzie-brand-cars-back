import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validated";
import { schemaCreateAnnounce } from "../../schemas/announce";
import { createAnnounceController } from "../../controllers/announce/create";

export const announceRoutes = Router();

announceRoutes.post(
  "",
  validateSchemaMiddleware(schemaCreateAnnounce),
  createAnnounceController
);
