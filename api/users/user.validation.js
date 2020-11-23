import Joi from "joi";
import { ValidationError } from "../helpers/errorConstructors";

class UserValidations {
  validatePagination(req, res, next) {
    const paginRules = Joi.object({
      page: Joi.number().integer().min(0),
      limit: Joi.number().integer().min(0),
    });
    const { page: q_page, limit: q_limit } = req.query;

    const validationResult = paginRules.validate({
      page: q_page,
      limit: q_limit,
    });
    if (validationResult.error) {
      throw new ValidationError(
        "page and limit must an integer greater than 0"
      );
    }
    next();
  }

  validateGetReq(req, res, next) {
    const paginRules = Joi.object({
      dateFrom: Joi.date(),
      dateTo: Joi.date(),
    });
    const { dateFrom: q_dateFrom, dateTo: q_dateTo } = req.query;

    const validationResult = paginRules.validate({
      dateFrom: q_dateFrom,
      dateTo: q_dateTo,
    });

    if (new Date(q_dateFrom) > new Date(q_dateTo)) {
      throw new ValidationError("dateFrom can't be greater than dateTo");
    }
    if (validationResult.error) {
      throw new ValidationError(
        'dateFrom and dateTo must a date. Ex. "YYYY-MM-DD"'
      );
    }
    next();
  }
}

export const userValidations = new UserValidations();
