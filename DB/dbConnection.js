require("dotenv").config();

let{ PGHOST, PGDATABASE, PGUSER, PGPASSWORD, } =process.env;

const {Pool} = require("pg");

const pool = new Pool({
    host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized:false,
  }
})

async function getPgVersion() {
    const client = await pool.connect();
    try {
      const result = await client.query(`select version()`);
      console.log(result.rows[0]);
    } finally {
      client.release();
    }
  }
  
  
  
  module.exports = { getPgVersion, pool };