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

    describe('GET /api/flights', () => {
        it('should get all flights', async () => {
            const res = await request(app).get('/api/flights');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('GET /api/flights/future', () => {
        it('should get all future flights', async () => {
            const res = await request(app).get('/api/flights/future');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('GET /api/flights/:id', () => {
        it('should get a flight by id', async () => {
            const flightData = {
                id: '1000',
                id_plane: '1',
                id_airport_departure: '1',
                id_airport_arrival: '2',
                departure_time: '2023-10-01T10:00:00Z',
                arrival_time: '2023-10-01T12:00:00Z'
            };

            await db.query(
                `INSERT INTO Flight (id, id_plane, id_airport_departure, id_airport_arrival, departure_time, arrival_time)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [flightData.id, flightData.id_plane, flightData.id_airport_departure, flightData.id_airport_arrival, flightData.departure_time, flightData.arrival_time]
            );

            const res = await request(app).get(`/api/flights/${flightData.id}`);

            expect(res.status).to.equal(200);
            expect(res.body.id).to.equal(Number(flightData.id));
        });

        it('should return 404 if flight is not found', async () => {
            const res = await request(app).get('/api/flights/9999');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error');
        });
    });
});