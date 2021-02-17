require("dotenv").config();

module.exports = {
  Development: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DATABASE,
    host: process.env.DBHOST,
    dialect: "mysql"
  },
  Production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
