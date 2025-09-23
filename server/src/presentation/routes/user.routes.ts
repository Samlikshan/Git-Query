import { Router } from "express";
import container from "../../config/container";
import TYPES from "../../config/types";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = container.get<UserController>(TYPES.UserController);

router.post("/:username", userController.getuser.bind(userController));

export default router;
