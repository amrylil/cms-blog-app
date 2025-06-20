import PostModel, { IPost } from '../models/post.model';
import slugify from 'slugify';

// Tipe data untuk membuat post baru
type CreatePostInput = {
  title: string;
  content: string;
  author: string;
};

// Tipe data untuk mengedit post, semua field bersifat opsional
type UpdatePostInput = {
  title?: string;
  content?: string;
  author?: string;
};

/**
 * Membuat post baru dan menyimpannya ke database.
 * @param postData Data post yang akan dibuat.
 * @returns Dokumen post yang baru dibuat.
 */
const create = async (postData: CreatePostInput): Promise<IPost> => {
  // Membuat slug dari judul saat post dibuat
  const slug = slugify(postData.title, { lower: true, strict: true });

  const newPost = new PostModel({
    ...postData,
    slug: slug, // Simpan slug yang baru dibuat
  });
  return await newPost.save();
};

/**
 * Mencari satu post berdasarkan judulnya.
 * @param title Judul post yang akan dicari.
 * @returns Dokumen post jika ditemukan, atau null.
 */
const findByTitle = async (title: string): Promise<IPost | null> => {
  return await PostModel.findOne({ title: title }).exec();
};

/**
 * Mencari satu post berdasarkan slug-nya.
 * @param slug Slug post yang akan dicari.
 * @returns Dokumen post jika ditemukan, atau null.
 */
const findBySlug = async (slug: string): Promise<IPost | null> => {
  return await PostModel.findOne({ slug: slug }).exec();
};

/**
 * Mengedit/memperbarui post berdasarkan slug-nya.
 * @param slug Slug dari post yang akan di-update.
 * @param updateData Data baru untuk post.
 * @returns Dokumen post yang sudah di-update, atau null jika tidak ditemukan.
 */
const update = async (slug: string, updateData: UpdatePostInput): Promise<IPost | null> => {
  const updatePayload: any = { ...updateData };

  // Jika judul di-update, buat ulang slug-nya juga
  if (updateData.title) {
    updatePayload.slug = slugify(updateData.title, { lower: true, strict: true });
  }

  // Cari dan update post. Opsi { new: true } akan mengembalikan dokumen yang sudah di-update.
  return await PostModel.findOneAndUpdate({ slug: slug }, updatePayload, {
    new: true,
  }).exec();
};

/**
 * Menghapus sebuah post berdasarkan slug-nya.
 * @param slug Slug dari post yang akan dihapus.
 * @returns Dokumen post yang dihapus, atau null jika tidak ditemukan.
 */
const remove = async (slug: string): Promise<IPost | null> => {
  // Cari dan hapus post berdasarkan slug-nya
  return await PostModel.findOneAndDelete({ slug: slug }).exec();
};


export default {
  create,
  findByTitle,
  findBySlug,
  update, // <-- Tambahkan fungsi update
  remove, // <-- Tambahkan fungsi remove
};