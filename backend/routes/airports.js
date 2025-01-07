import express from 'express'
import { pool as db } from '../db.js'
const router = express.Router()

// get all airports
router.get('/airports', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Airport');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
})

export default router