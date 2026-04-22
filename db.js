const mysq2 = require("mysql2");

const connection = mysq2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "retail_store"
});

connection.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = connection;