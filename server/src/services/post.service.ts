import PostModel, { IPost } from '../models/post.model';
import CategoryModel from '../models/category.model';
import TagModel from '../models/tag.model';
import UserModel from '../models/user.model';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import slugify from 'slugify';

/**
 * Logika bisnis untuk membuat post baru.
 * Service ini berbicara langsung dengan Model.
 * @param postData Data dari client, termasuk ID author, kategori, dan tags.
 * @returns Dokumen post yang baru dibuat.
 */
const createPost = async (postData: CreatePostDto): Promise<IPost> => {
  const { title, content, author, category, tags = [] } = postData;

  // --- LOGIKA BISNIS 1: PERSIAPAN DATA ---
  const slug = slugify(title, { lower: true, strict: true });
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / 230);

  // --- LOGIKA BISNIS 2: VALIDASI LANGSUNG KE MODEL ---
  // Cek duplikasi slug
  const existingPost = await PostModel.findOne({ slug });
  if (existingPost) {
    throw new Error('A post with this title already exists.');
  }

  // Cek apakah author yang dipilih ada
  const authorExists = await UserModel.findById(author);
  if (!authorExists) {
    throw new Error('Author not found.');
  }
  
  // Cek apakah kategori yang dipilih ada
  const categoryExists = await CategoryModel.findById(category);
  if (!categoryExists) {
    throw new Error('Category not found.');
  }

  // Cek apakah semua tag yang dipilih ada
  if (tags.length > 0) {
    const foundTags = await TagModel.find({ _id: { $in: tags } }).select('_id');
    if (foundTags.length !== tags.length) {
      throw new Error('One or more tags not found.');
    }
  }

  // --- EKSEKUSI ---
  // Membuat instance Post baru dengan data yang sudah siap
  const newPost = new PostModel({
    title,
    slug,
    content,
    author,
    category,
    tags,
    readTime,
    // Status akan menggunakan nilai default 'draft' dari model
  });

  return newPost.save();
};

/**
 * Mengambil semua post dari database, beserta data relasinya.
 */
const findAllPosts = async (): Promise<IPost[]> => {
  return PostModel.find({})
    .populate('author', 'name')
    .populate('category', 'name slug')
    .populate('tags', 'name slug')
    .sort({ createdAt: -1 })
    .exec();
};

/**
 * Mencari satu post berdasarkan slug-nya, beserta data relasinya.
 */
const findPostBySlug = async (slug: string): Promise<IPost | null> => {
  return PostModel.findOne({ slug })
    .populate('author', 'name')
    .populate('category', 'name slug')
    .populate('tags', 'name slug')
    .exec();
};

/**
 * Mengedit/memperbarui post berdasarkan slug-nya.
 */
const updatePost = async (slug: string, updateData: UpdatePostDto): Promise<IPost | null> => {
  const updatePayload: any = { ...updateData };

  // Jika judul di-update, buat ulang slug-nya juga
  if (updateData.title) {
    updatePayload.slug = slugify(updateData.title, { lower: true, strict: true });
  }

  return PostModel.findOneAndUpdate({ slug }, updatePayload, { new: true }).exec();
};

/**
 * Menghapus sebuah post berdasarkan slug-nya.
 */
const deletePost = async (slug: string): Promise<IPost | null> => {
  return PostModel.findOneAndDelete({ slug }).exec();
};

export default {
  createPost,
  findAllPosts,
  findPostBySlug,
  updatePost,
  deletePost,
};
