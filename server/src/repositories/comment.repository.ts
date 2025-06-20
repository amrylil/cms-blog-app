import CommentModel, { IComment } from '../models/comment.model';

// Tipe data untuk membuat komentar baru
type CommentCreationData = {
  text: string;
  author: string; // _id dari User
  post: string;   // _id dari Post
};

/**
 * Membuat dan menyimpan dokumen komentar baru.
 */
const create = async (commentData: CommentCreationData): Promise<IComment> => {
  const newComment = new CommentModel(commentData);
  await newComment.save();
  // Populate author agar bisa menampilkan nama di response
  return newComment.populate('author', 'name');
};

/**
 * Mengambil semua komentar untuk satu post tertentu.
 */
const findByPostId = async (postId: string): Promise<IComment[]> => {
  return CommentModel.find({ post: postId })
    .populate('author', 'name') // Mengambil nama penulis komentar
    .sort({ createdAt: 'asc' }) // Urutkan dari yang terlama
    .exec();
};

export default {
  create,
  findByPostId,
};
