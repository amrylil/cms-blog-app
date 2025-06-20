import commentRepository from '../repositories/comment.repository';
import postRepository from '../repositories/post.repository'; // Kita butuh ini!

/**
 * Menambahkan komentar baru ke sebuah post.
 * @param slug Slug dari post yang dikomentari.
 * @param userId ID dari user yang berkomentar.
 * @param text Isi dari komentar.
 * @returns Dokumen komentar yang baru dibuat.
 */
const addCommentToPost = async (slug: string, userId: string, text: string) => {
  // 1. Cari post berdasarkan slug untuk mendapatkan ID-nya
  const post = await postRepository.findBySlug(slug);
  if (!post) {
    throw new Error('Post not found.');
  }

  // 2. Buat komentar baru menggunakan repository
  const newComment = await commentRepository.create({
    text,
    author: userId,
    post: post._id as string,
  });

  // 3. Naikkan jumlah commentCount di post terkait
  //    (Kita akan tambahkan fungsi ini di post.repository.ts)
  await postRepository.incrementCommentCount(post._id as string);

  return newComment;
};

/**
 * Mengambil semua komentar untuk sebuah post.
 * @param slug Slug dari post.
 * @returns Array berisi semua dokumen komentar.
 */
const getCommentsForPost = async (slug: string) => {
  const post = await postRepository.findBySlug(slug);
  if (!post) {
    throw new Error('Post not found.');
  }

  return commentRepository.findByPostId(post._id as string);
};

export default {
  addCommentToPost,
  getCommentsForPost,
};
