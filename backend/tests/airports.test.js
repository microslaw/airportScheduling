import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import airportRoutes from '../routes/airports.js';
import sinon from 'sinon';
import { pool as db } from '../db.js';

// Initialize the Express app for testing
const app = express();
app.use(express.json());
app.use('/api', airportRoutes);

describe('Airport Routes', () => {
    beforeEach(async () => {
        await db.query('CREATE TEMPORARY TABLE Airport (LIKE Airport INCLUDING ALL)');
    });

    afterEach(async () => {
        await db.query('DROP TABLE IF EXISTS pg_temp.Airport');
    });

    describe('GET /api/airports', () => {
        it('should get all airports', async () => {
            const res = await request(app).get('/api/airports');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });

        it('should handle database errors gracefully', async () => {
            // Simulate a database error
            const dbQueryStub = sinon.stub(db, 'query').throws(new Error('Database error'));

            const res = await request(app).get('/api/airports');

            expect(res.status).to.equal(500);
            expect(res.body).to.have.property('error');

            dbQueryStub.restore();
        });
    });
});