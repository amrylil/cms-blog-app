import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/user.model';

// Kita perlu memperluas interface Request standar dari Express
// agar bisa menempelkan properti 'user' di dalamnya tanpa error TypeScript.
declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Properti 'user' ini bersifat opsional di semua request
    }
  }
}

// ====================================================================
// BEST PRACTICE: Buat interface baru untuk request yang sudah terotentikasi.
// Ini akan menyelesaikan masalah tipe 'unknown' atau 'undefined' di controller.
export interface IAuthRequest extends Request {
  user: IUser; // Di sini, kita jamin 'user' PASTI ada dan tipenya IUser.
}
// CARA PAKAI DI CONTROLLER (Contoh):
// Ganti: export const myHandler = async (req: Request, res: Response) => { ... }
// Menjadi: export const myHandler = async (req: IAuthRequest, res: Response) => { ... }
// Dengan begitu, di dalam handler, 'req.user._id' tidak akan lagi error.
// ====================================================================


/**
 * Middleware untuk memproteksi route.
 * Ia akan memeriksa token JWT di header Authorization.
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // 1. Cek apakah header Authorization ada dan menggunakan format "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Ambil token dari header dengan memisahkan string "Bearer "
      token = req.headers.authorization.split(' ')[1];

      // 3. Verifikasi keaslian token menggunakan secret key dari .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      // 4. Cari pengguna di database berdasarkan ID yang ada di dalam token.
      //    Gunakan .select('-password') untuk memastikan field password tidak ikut terambil.
      req.user = await UserModel.findById(decoded.id).select('-password');

      // Jika pengguna tidak ditemukan (misalnya sudah dihapus), tolak akses.
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // 5. Jika semua berhasil, lanjutkan ke middleware atau controller berikutnya.
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // Jika token tidak ada di header sama sekali
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
