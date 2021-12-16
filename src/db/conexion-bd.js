const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "123",
  database: "netflix2",
});

module.exports = Object.freeze({
  pool: pool,
});
