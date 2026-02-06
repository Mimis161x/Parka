import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.routes';
import parkRoutes from "./routes/park.routes";
import bookingRoutes from "./routes/booking.routes";
import {swaggerSpec} from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api--docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/auth', authRoutes);
app.use('/park', parkRoutes);
app.use('/booking', bookingRoutes);


app.get('/', (req, res) => res.send('Api working!'))

export default app;