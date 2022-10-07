import { createConnection } from "mysql2";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mysqljs_db",
});

connection.connect((err) => {
  if (!err) {
    console.log("database connected!");
  } else {
    console.log("can't connect to the database");
  }
});

export default connection;
