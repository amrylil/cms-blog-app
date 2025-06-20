// src/index.ts

// LANGKAH 1: Panggil dotenv.config() di paling atas agar semua .env termuat
import dotenv from 'dotenv';
dotenv.config();

// LANGKAH 2: Lakukan import lain setelah dotenv
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDB } from './config/db'; // Asumsi Anda punya file ini untuk koneksi DB

// LANGKAH 3: Import SEMUA file route Anda
import postRoutes from './routes/post.routes';
import authRoutes from './routes/auth.routes'; // <-- INI YANG KURANG TADI

const app: Application = express();
const PORT = process.env.PORT || 5001;

// Koneksi ke Database
connectDB();

// Middleware standar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route untuk cek kesehatan server
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});


app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes); 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); 

  // Cek apakah response header sudah dikirim
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    message: err.message || 'An unexpected error occurred.',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});