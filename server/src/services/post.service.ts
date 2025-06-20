import PostModel, { IPost } from '../models/post.model';
import slugify from 'slugify';

// Tipe ini HANYA berisi apa yang client kirim. Slug kita hapus dari sini.
type CreatePostInput = {
  title: string;
  content: string;
  author: string;
};

// Tipe untuk update tetap sama, karena semua opsional.
type UpdatePostInput = {
  title?: string;
  content?: string;
  author?: string;
};

/**
 * Membuat post baru, slug dibuat secara otomatis.
 * @param postData Data dari client (title, content, author).
 * @returns Dokumen post yang baru dibuat.
 */
const create = async (postData: CreatePostInput): Promise<IPost> => {
  const slug = slugify(postData.title, { 
    lower: true,      // paksa jadi huruf kecil
    strict: true,     // hapus karakter aneh dengan ketat
  });

  const existingPost = await PostModel.findOne({ slug });
  if (existingPost) {
    throw new Error('A post with this title already exists.');
  }
  
  const newPost = new PostModel({
    ...postData,
    slug: slug, 
  });

  // 3. Simpan ke database
  return await newPost.save();
};

const findBySlug = async (slug: string): Promise<IPost | null> => {
  return await PostModel.findOne({ slug: slug }).exec();
};

const update = async (slug: string, updateData: UpdatePostInput): Promise<IPost | null> => {
  const updatePayload: any = { ...updateData };

  if (updateData.title) {
    updatePayload.slug = slugify(updateData.title, { lower: true, strict: true });
  }

  return await PostModel.findOneAndUpdate({ slug: slug }, updatePayload, {
    new: true,
  }).exec();
};

const findAll = async (): Promise<IPost[]> => {
  return await PostModel.find({}).sort({ createdAt: -1 }).exec(); // Urutkan dari yang terbaru
};

const remove = async (slug: string): Promise<IPost | null> => {
  return await PostModel.findOneAndDelete({ slug: slug }).exec();
};


export default {
  create,
  findAll,
  findBySlug,
  update,
  remove,
};