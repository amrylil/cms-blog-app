// src/models/user.model.ts

import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface untuk type safety
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role?: 'user' | 'admin';
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // 'select: false' agar password tidak ikut terkirim saat query find
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true, versionKey: false }
);

// Middleware (hook) yang berjalan SEBELUM dokumen disimpan (.save())
UserSchema.pre<IUser>('save', async function (next) {
  // 'this' merujuk ke dokumen user yang akan disimpan
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  if (!user.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (error: any) {
    return next(error);
  }
});

// Method untuk membandingkan password yang masuk dengan password di database
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = model<IUser>('User', UserSchema);
export default UserModel;