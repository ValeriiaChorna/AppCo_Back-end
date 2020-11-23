import { Router } from "express";
import { usersController } from "./user.controllers";
import { userValidations } from "./user.validation";

const router = Router();

router.get(
  "/statistic",
  userValidations.validatePagination,
  usersController.getUserStatistic
);

router.get(
  "/statistic/:userId",
  userValidations.validateGetReq,
  usersController.getUserStatisticById
);

export const usersRouter = router;
