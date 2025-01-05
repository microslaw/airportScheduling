import express from 'express';
import { pool as db } from '../db.js'
const router = express.Router();

// create a new flight
router.post('/flights', async (req, res) => {
    const { id, id_plane, id_airport_departure, id_airport_arrival, departure_time, arrival_time } = req.body;

    // validate input fields
    if (!id || !id_plane || !id_airport_departure || !id_airport_arrival || !departure_time || !arrival_time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await db.query(
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

// get all flights
router.get('/flights', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Flight');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
})

// get future flights 
router.get('/flights/future', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Flight WHERE departure_time > NOW()');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
})

// get a flight by id
router.get('/flights/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM Flight WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Flight not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
})

export default router;