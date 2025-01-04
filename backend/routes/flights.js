import express from 'express';
import pg from 'pg';
const router = express.Router();

// PostgreSQL client
const { Client } = pg;
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'airport_scheduling_staging',
});

await client.connect()

// create a new flight
router.post('/flights', async (req, res) => {
    const { id, id_plane, id_airport_departure, id_airport_arrival, departure_time, arrival_time } = req.body;

    // validate input fields
    if (!id || !id_plane || !id_airport_departure || !id_airport_arrival || !departure_time || !arrival_time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await client.query(
            `INSERT INTO Flight (id, id_plane, id_airport_departure, id_airport_arrival, departure_time, arrival_time)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [id, id_plane, id_airport_departure, id_airport_arrival, departure_time, arrival_time]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
});

export default router;