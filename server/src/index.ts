import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/post.routes';
import { connectDB } from './config/db';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});

app.use('/api/posts', postRoutes);

// === MIDDLEWARE UNTUK MENANGANI ERROR (ERROR HANDLER) ===
// Pastikan Anda menggunakan app.use() di sini
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); 

  res.status(500).json({
    message: err.message || 'An unexpected error occurred.',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});