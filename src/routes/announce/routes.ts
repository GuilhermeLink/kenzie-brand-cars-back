import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validated";
import { createAnnounceController } from "../../controllers/announce/create";
import { authValidationMiddleware } from "../../middlewares/auth";
import {
  schemaCreateAnnounce,
  schemaUpdateAnnounce,
} from "../../schemas/announce";
import { showAnnounceController, showAnnounceIdController } from "../../controllers/announce/get";
import { updateAnnounceController } from "../../controllers/announce/update";
import { softdeleteAnnounceController } from "../../controllers/announce/delete";

export const announceRoutes = Router();

announceRoutes.post(
  "",
  authValidationMiddleware,
  validateSchemaMiddleware(schemaCreateAnnounce),
  createAnnounceController
);

announceRoutes.get("", authValidationMiddleware, showAnnounceController);

announceRoutes.get("/:id", authValidationMiddleware, showAnnounceIdController);


announceRoutes.patch(
  "/:id",
  authValidationMiddleware,
  validateSchemaMiddleware(schemaUpdateAnnounce),
  updateAnnounceController
);

announceRoutes.delete(
  "/:id",
  authValidationMiddleware,
  softdeleteAnnounceController
);
