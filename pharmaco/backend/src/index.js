import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import scanRouter from './routes/scan.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/scan', scanRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Pharmaco backend running on port ${PORT}`);
});
