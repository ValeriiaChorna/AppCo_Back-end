import { Router } from "express";
import { usersController } from "./user.controllers";
// import { contactValidations } from "./contact.validation";

const router = Router();

router.get("/statistic", usersController.getUserStatistic);

router.get("/statistic/:userId", usersController.getUserStatisticById);

export const usersRouter = router;
