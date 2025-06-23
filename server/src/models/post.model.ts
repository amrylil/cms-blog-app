import { model, Schema, Document } from 'mongoose';
import slugify from 'slugify';
import { IUser } from './user.model';
import { ICategory } from './category.model';
import { ITag } from './tag.model';

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  author: IUser['_id'];
  category: ICategory['_id'];
  tags: ITag['_id'][];
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  likes: IUser['_id'][];
  views: number;
  commentCount: number;
  readTime: number; // Dalam satuan menit
  publishedAt?: Date | null;
}

// Skema Mongoose final
const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Post must have a category'],
    },
    tags: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    }],
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled', 'archived'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    views: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hook untuk membuat slug otomatis
PostSchema.pre<IPost>('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const PostModel = model<IPost>('Post', PostSchema);

export default PostModel;