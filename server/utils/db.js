import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { pool };
