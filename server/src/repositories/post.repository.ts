import PostModel, { IPost } from '../models/post.model';
import { UpdatePostDto } from '../dtos/post.dto';
import slugify from 'slugify';

// Tipe data ini mendefinisikan semua field yang dibutuhkan untuk membuat dokumen Post baru.
// Ini membuat kontrak fungsi 'create' menjadi sangat jelas.
type PostCreationData = {
  title: string;
  slug: string;
  content: string;
  author: string;   // Ini adalah _id dari User
  category: string; // Ini adalah _id dari Category
  tags?: string[];  // Ini adalah array _id dari Tag
  status?: 'draft' | 'published' | 'scheduled' | 'archived'; // Menambahkan status
  readTime?: number;
};

/**
 * Membuat dan menyimpan dokumen Post baru ke database.
 * @param postData Objek lengkap berisi semua data untuk post baru.
 * @returns Dokumen post yang baru dibuat.
 */
const create = async (postData: PostCreationData): Promise<IPost> => {
  // Tugas repository hanya menerima data yang sudah siap dan menyimpannya.
  const newPost = new PostModel(postData);
  return newPost.save();
};

/**
 * Mengambil semua post dari database, beserta data relasinya.
 * @returns Array berisi semua dokumen post.
 */
const findAll = async (): Promise<IPost[]> => {
  return PostModel.find()
    .populate('author', 'name email')   // Mengisi data 'author' dengan nama dan email dari model User
    .populate('category', 'name slug')    // Mengisi data 'category' dengan nama dan slug dari model Category
    .populate('tags', 'name slug')        // Mengisi data 'tags' dengan nama dan slug dari model Tag
    .sort({ createdAt: -1 })              // Mengurutkan dari yang terbaru
    .exec();
};

/**
 * Mencari satu post berdasarkan slug-nya, beserta data relasinya.
 * @param slug Slug unik dari post yang akan dicari.
 * @returns Dokumen post jika ditemukan, atau null.
 */
const findBySlug = async (slug: string): Promise<IPost | null> => {
  return PostModel.findOne({ slug })
    .populate('author', 'name email')
    .populate('category', 'name slug')
    .populate('tags', 'name slug')
    .exec();
};

const incrementCommentCount = async (postId: string): Promise<void> => {
  // Gunakan $inc untuk operasi atomik yang efisien
  await PostModel.updateOne({ _id: postId }, { $inc: { commentCount: 1 } });
};

/**
 * Mengupdate satu post berdasarkan slug-nya.
 * @param slug Slug unik dari post yang akan diupdate.
 * @param updateData Data baru untuk post.
 * @returns Dokumen post yang sudah diupdate, atau null jika tidak ditemukan.
 */
const updateBySlug = async (slug: string, updateData: UpdatePostDto): Promise<IPost | null> => {
  // Karena repository yang paling tahu tentang field,
  // maka logis jika logika update slug diletakkan di sini.
  const updatePayload: any = { ...updateData };
  if (updateData.title) {
    updatePayload.slug = slugify(updateData.title, { lower: true, strict: true });
  }

  // Cari dan update. Opsi { new: true } akan mengembalikan dokumen versi baru setelah diupdate.
  return PostModel.findOneAndUpdate({ slug }, updatePayload, { new: true }).exec();
};

/**
 * Menghapus satu post berdasarkan slug-nya.
 * @param slug Slug unik dari post yang akan dihapus.
 * @returns Dokumen post yang dihapus, atau null jika tidak ditemukan.
 */
const deleteBySlug = async (slug: string): Promise<IPost | null> => {
  return PostModel.findOneAndDelete({ slug }).exec();
};

export default {
  create,
  findAll,
  findBySlug,
  updateBySlug,
  incrementCommentCount,
  deleteBySlug,
};
