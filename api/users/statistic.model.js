import Sequelize from "sequelize";
import db from "../db-connection";

class User_Statistic extends Sequelize.Model {}

async function initUserStatistic() {
  return new Promise((res) => {
    User_Statistic.init(
      {
        stat_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "user",
            key: "id",
          },
        },
        date: { type: Sequelize.STRING, allowNull: false },
        page_views: { type: Sequelize.INTEGER, allowNull: false },
        clicks: { type: Sequelize.INTEGER, allowNull: false },
      },
      {
        sequelize: db,
        modelName: "User_statictic",
      }
    );
    res();
  });
}

export default {
  initStatistic: initUserStatistic,
  statisticClass: User_Statistic,
};
