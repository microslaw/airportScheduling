import express from 'express'
import flightRoutes from './routes/flights.js'
import airportsRoutes from './routes/airports.js'
import 'dotenv/config'

// Express server
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use('/api', flightRoutes)
app.use('/api', airportsRoutes)

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})