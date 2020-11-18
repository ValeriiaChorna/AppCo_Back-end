const { Sequelize } = require("sequelize");
// const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "./users.db";

const db = new Sequelize({
  dialect: "sqlite",
  storage: DBSOURCE,
});

export default db;
