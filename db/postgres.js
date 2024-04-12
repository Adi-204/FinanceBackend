import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: {
      require : true
    },
});

const db = {
  query: (text, params) => {
    return pool.query(text, params);
  }
};

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database!');
  } catch (error) {
    console.log(12345);
    console.error('PostgreSQL db connection failed:', error);
    console.error('Attempting to reconnect to the database...');
    setTimeout(connectDB, 5000); 
  }
};

export { db, connectDB };