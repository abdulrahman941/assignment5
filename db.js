const mysq2 = require("mysql2/promise");


async function connectToDB(){
  try {
  const connection =await mysq2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "retail_store"
});
console.log("Connected to MySQL");
    return connection;
  } catch (error) {
    console.error("DB Error:", err.message);
  }
}


connectToDB()


module.exports = connectToDB;