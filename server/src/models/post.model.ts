  import { model, Schema, Document } from 'mongoose';

  // 1. Definisikan Interface TypeScript untuk dokumen Post
  // Ini akan memastikan type safety saat kita menggunakan data ini di kode kita.
  export interface IPost extends Document {
    title: string;
    content: string;
    author: string;
    slug: string; // URL-friendly version of the title
  }

  // 2. Buat Skema Mongoose
  // Ini mendefinisikan bentuk dokumen yang akan disimpan di MongoDB.
  const PostSchema: Schema = new Schema(
    {
      title: {
        type: String,
        required: [true, 'Title is required'],
      },
      content: {
        type: String,
        required: [true, 'Content is required'],
      },
      author: {
        type: String,
        required: [true, 'Author is required'],
      },
      slug: {
        type: String,
        required: true,
        unique: true, // Setiap post harus memiliki slug yang unik
        lowercase: true,
      },
    },
    {
      timestamps: true, // Otomatis menambahkan field `createdAt` dan `updatedAt`
      versionKey: false, // Menghilangkan field `__v`
    }
  );

  // 3. Buat dan ekspor Model Mongoose
  // Model adalah constructor yang kita gunakan untuk membuat dan membaca dokumen dari MongoDB.
  const PostModel = model<IPost>('Post', PostSchema);

  export default PostModel;