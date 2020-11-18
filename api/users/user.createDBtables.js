import db from "../db-connection";
import users_json from "../../db/users.json";
import usersStat_json from "../../db/users_statistic.json";

export default function createDBtables() {
  db.serialize(function () {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name text, 
            last_name text,
            email text UNIQUE, 
            gender text, 
            ip_address text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          console.log("Error: couldn't connect to table users");
        } else {
          console.log("Connected to table users");

          db.serialize(function () {
            const insertData = db.prepare(
              "INSERT INTO users VALUES (?,?,?,?,?,?)"
            );

            users_json.map(
              ({ id, first_name, last_name, email, gender, ip_address }) => {
                insertData.run([
                  id,
                  first_name,
                  last_name,
                  email,
                  gender,
                  ip_address,
                ]);
              }
            );
            insertData.finalize();
          });
        }
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS users_statistic (
            static_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            date text, 
            page_views INTEGER,
            clicks INTEGER, 
            FOREIGN KEY (user_id) REFERENCES users (id) 
            )`,
      (err) => {
        if (err) {
          console.log("Error: couldn't connect to users_statistic");
        } else {
          console.log("Connected to table users_statistic");

          db.serialize(function () {
            const insertData = db.prepare(
              "INSERT or IGNORE INTO users_statistic (user_id, date, page_views, clicks) VALUES (?,?,?,?)"
            );

            usersStat_json.map(({ user_id, date, page_views, clicks }) => {
              insertData.run([user_id, date, page_views, clicks]);
            });
            insertData.finalize();
          });
        }
      }
    );
  });
}
