import express from "express";
// import { contactsRouter } from "./contacts/contacts.router";
// import { authRouter } from "./auth/auth.router";
import morgan from "morgan";
import path from "path";
import db from "./db-connection";
import userModel from "./users/user.model";
import statisticModel from "./users/statistic.model";

const PORT = process.env.PORT || 3001;

export class CrudServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddleware();
    await this.initDatabase();
    this.initRoutes();
    this.handleErrors();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(morgan("tiny"));
  }

  initRoutes() {
    this.server.use(express.static(path.join(__dirname, "../static")));
    // this.server.use("/contacts", contactsRouter);
    // this.server.use("/auth", authRouter);
  }

  handleErrors() {
    this.server.use((err, req, res, next) => {
      delete err.stack;
      return res.status(err.status || 500).send(`${err.name}: ${err.message}`);
    });
  }

  async initDatabase() {
    try {
      await db.authenticate();
      console.log("Database SQLite connection successful");

      await userModel.initUser();
      await statisticModel.initStatistic();
      userModel.userClass.hasMany(statisticModel.statisticClass, {
        foreignKey: "user_id",
      });
      await db.sync();

      console.log("Tables connection successful");
    } catch (err) {
      console.log("SQLite connection error", err);
      // console.log("Close the database connection.");
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}
