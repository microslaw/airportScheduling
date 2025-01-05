import pg from 'pg'
const { Pool } = pg

export const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'airport_scheduling_staging'
});