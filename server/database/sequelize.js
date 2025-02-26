import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_PORT = process.env.DB_PORT;

const sq = new Sequelize({
  dialect: postgres,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  logging: false,
});

try {
  sq.authenticate();
  console.log(
    `\x1b[36mConnected to database \x1b[35m${DB_NAME}\x1b[36m as \x1b[35m${DB_USER}\x1b[36m (${DB_HOST}: ${DB_PORT})`,
    "\x1b[0m",
  );
} catch (error) {
  console.error(error);
}

export default sq;
