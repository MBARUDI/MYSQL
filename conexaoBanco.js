var mysql = require("mysql");
var connectBanco = mysql.createConnection({
  host: "localhost", user: "root", password: "", 
  database: "escola"
});

module.exports = connectBanco;