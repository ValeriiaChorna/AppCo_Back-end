import Sequelize from "sequelize";
import db from "../db-connection";

class User extends Sequelize.Model {}

async function initUser() {
  return new Promise((res) => {
    User.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        first_name: { type: Sequelize.STRING, allowNull: false },
        last_name: { type: Sequelize.STRING, allowNull: false },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
        gender: { type: Sequelize.STRING, allowNull: false },
        ip_address: { type: Sequelize.STRING, allowNull: false },
      },
      {
        sequelize: db,
        modelName: "User",
      }
    );
    res();
  });
}

export default {
  initUser: initUser,
  userClass: User,
};
