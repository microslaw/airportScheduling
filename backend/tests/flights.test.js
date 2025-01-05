// filepath: /Users/matteominin/Desktop/ANDB/airportScheduling/backend/tests/flights.test.js
import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import flightRoutes from '../routes/flights.js';
import { pool as db } from '../db.js';

// Initialize the Express app for testing
const app = express();
app.use(express.json());
app.use('/api', flightRoutes);

describe('Flight Routes', () => {
    beforeEach(async () => {
        await db.query('CREATE TEMPORARY TABLE Flight (LIKE Flight INCLUDING ALL)');
    });

    afterEach(async () => {
        await db.query('DROP TABLE IF EXISTS pg_temp.Flight');
    });

    describe('POST /api/flights', () => {
        it('should create a new flight', async () => {
            const flightData = {
                id: '1000',
                id_plane: '1',
                id_airport_departure: '1',
                id_airport_arrival: '2',
                departure_time: '2023-10-01T10:00:00Z',
                arrival_time: '2023-10-01T12:00:00Z'
            };

            const res = await request(app)
                .post('/api/flights')
                .send(flightData);

            expect(res.status).to.equal(201);
        });

        it('should return 400 if required fields are missing', async () => {
            const res = await request(app).post('/api/flights').send({});

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
        });
    });
});