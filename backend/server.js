import express from 'express'
import flightRoutes from './routes/flights.js'
import 'dotenv/config'
import cors from 'cors';

// Express server
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use('/api', flightRoutes)

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})

app.use(cors({ origin: 'http://localhost:3000' }));