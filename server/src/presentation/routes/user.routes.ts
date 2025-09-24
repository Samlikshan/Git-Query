import { Router } from "express";
import container from "../../config/container";
import TYPES from "../../config/types";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = container.get<UserController>(TYPES.UserController);

router.get("/", userController.getUsers.bind(userController));
router.post("/:username", userController.getuser.bind(userController));
router.post(
  "/:username/mutual",
  userController.getFreinds.bind(userController),
);
router.patch("/:username", userController.updateUser.bind(userController));
router.delete("/:username", userController.softDeleteUser.bind(userController));

export default router;
