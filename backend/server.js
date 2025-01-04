import express from 'express'
import pg from 'pg'
import flightRoutes from './routes/flights.js'
import 'dotenv/config'

// PostgreSQL client
const { Client } = pg;
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'airport_scheduling_staging',
});

await client.connect()

// Express server
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use('/api', flightRoutes)

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})