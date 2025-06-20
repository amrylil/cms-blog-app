import { model, Schema, Document } from 'mongoose';
import slugify from 'slugify';

// Interface untuk type safety
export interface ITag extends Document {
  name: string;
  slug: string;
}

// Skema Mongoose
const TagSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required'],
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

// Hook untuk membuat slug otomatis
TagSchema.pre<ITag>('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const TagModel = model<ITag>('Tag', TagSchema);

export default TagModel;