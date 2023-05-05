import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validated";
import { schemaCreateAccount, schemaUpdateAccount } from "../../schemas/user";
import { createUserController } from "../../controllers/user/create";
import { updateUserController } from "../../controllers/user/update";
import { authValidationMiddleware } from "../../middlewares/auth";
import { deleteUserController } from "../../controllers/user/delete";
import { sendResetEmailController } from "../../controllers/user/sendemails";
import { resetUserPasswordController } from "../../controllers/user/resetpass";

export const userRoutes = Router();

userRoutes.post(
  "",
  validateSchemaMiddleware(schemaCreateAccount),
  createUserController
);

userRoutes.post("/reset_password", authValidationMiddleware, sendResetEmailController);

userRoutes.patch("/reset_password/:token", authValidationMiddleware, resetUserPasswordController);

userRoutes.patch(
  "/:id",
  authValidationMiddleware,
  validateSchemaMiddleware(schemaUpdateAccount),
  updateUserController
);

userRoutes.delete("/:id", authValidationMiddleware, deleteUserController);
