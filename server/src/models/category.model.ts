import { model, Schema, Document } from 'mongoose';
import slugify from 'slugify';

// Interface untuk type safety
export interface ICategory extends Document {
  name: string;
  slug: string;
}

// Skema Mongoose
const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware (Hook) untuk membuat slug secara otomatis sebelum menyimpan
CategorySchema.pre<ICategory>('save', function (next) {
  // Hanya buat slug jika nama berubah atau ini dokumen baru
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const CategoryModel = model<ICategory>('Category', CategorySchema);

export default CategoryModel;