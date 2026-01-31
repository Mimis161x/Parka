import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// routes argotera


app.get('/', (req, res) => res.send('Api working!'))

export default app;