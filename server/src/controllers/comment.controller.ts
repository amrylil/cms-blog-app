import { Response, NextFunction, Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCommentDto } from '../dtos/comment.dto';
import commentService from '../services/comment.service';
// Kita tidak lagi butuh IAuthRequest di sini karena kita akan menggunakan Type Guard

/**
 * Handler untuk menambah komentar baru pada sebuah post.
 */
export const addCommentHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    // --- PERBAIKAN FINAL UNTUK MASALAH ROUTE & USERID ---

    // 1. Kita gunakan `req: Request` agar signature fungsi ini cocok dengan yang diharapkan Express Router.
    //    Ini akan menghilangkan error 'No overload matches this call' di file route Anda.

    // 2. Tambahkan "Type Guard". Ini adalah pengecekan untuk memastikan `req.user` ada.
    //    Ini juga memberitahu TypeScript bahwa di semua baris setelah ini, `req.user` PASTI ada.
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user data is missing from request' });
    }

    // 3. Sekarang kita bisa dengan aman mengakses _id dan mengubahnya menjadi string.
    //    Error 'type unknown' akan hilang karena adanya Type Guard di atas.
    const userId = req.user._id; 

    const createCommentDto = plainToInstance(CreateCommentDto, req.body);
    const errors = await validate(createCommentDto);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const newComment = await commentService.addCommentToPost(slug, userId as string, createCommentDto.text);

    return res.status(201).json({
      message: 'Comment added successfully',
      data: newComment,
    });
  } catch (error: any) {
    if (error.message === 'Post not found.') {
      return res.status(404).json({ message: error.message });
    }
    return next(error);
  }
};

/**
 * Handler untuk mengambil semua komentar dari sebuah post.
 * (Tidak ada perubahan di sini karena ini rute publik)
 */
export const getCommentsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const comments = await commentService.getCommentsForPost(slug);
        return res.status(200).json({ data: comments });
    } catch (error: any) {
         if (error.message === 'Post not found.') {
          return res.status(404).json({ message: 'Post not found' });
        }
        return next(error);
    }
}
