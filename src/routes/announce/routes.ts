import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validated";
import { createAnnounceController } from "../../controllers/announce/create";
import { authValidationMiddleware } from "../../middlewares/auth";
import {
  schemaCreateAnnounce,
  schemaCreateComment,
  schemaUpdateAnnounce,
} from "../../schemas/announce";
import { showAnnounceController } from "../../controllers/announce/get";
import { updateAnnounceController } from "../../controllers/announce/update";
import { softdeleteAnnounceController } from "../../controllers/announce/delete";
import { showSpecifiAnnounceController } from "../../controllers/announce/getSpecificId";
import { createCommentController, listCommentsController } from "../../controllers/announce/comment";

export const announceRoutes = Router();

announceRoutes.post(
  "",
  authValidationMiddleware,
  validateSchemaMiddleware(schemaCreateAnnounce),
  createAnnounceController
);

// announceRoutes.get("", authValidationMiddleware, showAnnounceController);
announceRoutes.get("", showAnnounceController);
// announceRoutes.get("/:id", authValidationMiddleware, showSpecifiAnnounceController)
announceRoutes.get("/:id", showSpecifiAnnounceController)

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

announceRoutes.post(
  "/:id/comments",
  authValidationMiddleware,
  validateSchemaMiddleware(schemaCreateComment),
  createCommentController
);

announceRoutes.get(
  "/:id/comments",
  authValidationMiddleware,
  listCommentsController
);
