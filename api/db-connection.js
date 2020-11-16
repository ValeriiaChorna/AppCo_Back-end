const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./users.db";

let db = new sqlite3.Database(
  DBSOURCE,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
      console.log("Connected to the users database.");
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
            // Table already created
            console.log("Error of table users creation");
          } else {
            console.log("Connected to table users");
            const data =
              "INSERT INTO user (name, email, password) VALUES (?,?,?)";
            // db.run(data, ["admin", "admin@example.com", md5("admin123456")]);
          }
        }
      );
    }
  }
);

export default db;
