import express from 'express'
import cors from 'cors'
import flightRoutes from './routes/flights.js'
import airportsRoutes from './routes/airports.js'
import 'dotenv/config'
import cors from 'cors';

// Express server
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', flightRoutes)
app.use('/api', airportsRoutes)

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})

app.use(cors({ origin: 'http://localhost:3000' }));
