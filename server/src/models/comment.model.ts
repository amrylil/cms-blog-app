import { model, Schema, Document } from 'mongoose';
import { IUser } from './user.model';
import { IPost } from './post.model';

// Interface untuk type safety
export interface IComment extends Document {
  text: string;
  author: IUser['_id']; // Menyimpan referensi ID ke User
  post: IPost['_id'];   // Menyimpan referensi ID ke Post
}

// Skema Mongoose untuk Komentar
const CommentSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Comment text is required'],
      trim: true,
    },
    // Ini adalah relasi ke model User
    author: {
      type: Schema.Types.ObjectId, // Tipe datanya adalah sebuah ID dari dokumen lain
      ref: 'User',                 // Memberitahu Mongoose bahwa ID ini merujuk ke model 'User'
      required: true,
    },
    // Ini adalah relasi ke model Post
    post: {
      type: Schema.Types.ObjectId, // Tipe datanya adalah sebuah ID
      ref: 'Post',                 // Merujuk ke model 'Post'
      required: true,
    },
  },
  {
    timestamps: true, // Otomatis menambahkan field `createdAt` dan `updatedAt`
    versionKey: false,
  }
);

const CommentModel = model<IComment>('Comment', CommentSchema);

export default CommentModel;
