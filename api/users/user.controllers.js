import userModel from "./user.model";
import statisticModel from "./statistic.model";
import db from "../db-connection";
// import { NotFound } from "../helpers/errorConstructors";
import {
  createControllerProxy
} from "../helpers/controllerProxy";

class UserController {
  async getUserStatistic(req, res, next) {
    try {
      const {
        page: q_page,
        limit: q_limit
      } = req.query;
      const page = q_page || 0;
      const limit = q_limit || 50;
      const maxId = await userModel.userClass.findAll({
        attributes: [
          [db.fn('max', db.col('id')), 'maxId']
        ],
      });
      const tableLength = maxId[0].dataValues.maxId;
      const totalPages = Math.ceil(tableLength / limit) - 1;
      const usersStatisticList = await statisticModel.statisticClass.findAll({
        offset: page * limit,
        limit: limit,
        group: ["user_id"],
        attributes: [
          "user_id",
          [db.fn("sum", db.col("page_views")), "Total_page_views"],
          [db.fn("sum", db.col("clicks")), "Total_clicks"],
        ],

        include: {
          model: userModel.userClass,
          as: "user_inf",
          attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "gender",
            "ip_address",
          ],
        },
      });
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      return res.status(200).json({
        page,
        totalPages,
        limit,
        usersStatisticList
      });
    } catch (err) {
      next(err);
    }
  }

  async getUserStatisticById(req, res, next) {
    try {
      const {
        userId
      } = req.params;
      const {
        dateFrom,
        dateTo
      } = req.query;
      const user_inf = await userModel.userClass.findOne({
        where: {
          id: userId
        },
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "gender",
          "ip_address",

        ],
      });
      const foundedUserStatistic = await statisticModel.statisticClass.findAll({
        where: {
          user_id: userId
        },
        attributes: ["date", "page_views", "clicks"],
      });
      const filteredByDate = await this.filterByDate(
        foundedUserStatistic,
        dateFrom,
        dateTo
      );
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      return res.status(200).json({
        user_inf,
        user_statistic: filteredByDate
      });
    } catch (err) {
      next(err);
    }
  }

  filterByDate(data, dateFrom, dateTo) {
    const dataDates = data
      .map(({
        date
      }) => new Date(date))
      .sort((a, b) => a - b);
    const minDate = dataDates[0];
    const maxDate = dataDates[dataDates.length - 1];
    const FROM = (dateFrom && new Date(dateFrom)) || minDate;
    const TO = (dateTo && new Date(dateTo)) || maxDate;
    const statistic_data = data.filter(
      ({
        date
      }) => new Date(date) >= FROM && new Date(date) <= TO
    );
    return {
      statistic_data,
      minDate,
      maxDate
    };
  }
}

export const usersController = createControllerProxy(new UserController());