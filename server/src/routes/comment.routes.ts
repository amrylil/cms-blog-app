import { Router } from 'express';
import { 
  // ... (import handler post lainnya)
} from '../controllers/post.controller';

// Impor handler comment yang baru
import { addCommentHandler, getCommentsHandler } from '../controllers/comment.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Rute Publik untuk mengambil semua komentar dari sebuah post
router.get('/:slug/comments', getCommentsHandler);

// Rute Terproteksi untuk menambah komentar baru
router.post('/:slug/comments', protect, addCommentHandler);


export default router;
