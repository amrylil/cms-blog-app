// src/repositories/user.repository.ts

import UserModel, { IUser } from '../models/user.model';
import { RegisterUserDto } from '../dtos/auth.dto';

/**
 * Mencari satu pengguna berdasarkan alamat emailnya.
 * (Secara default, password tidak akan ikut)
 */
const findByEmail = async (email: string): Promise<IUser | null> => {
  return UserModel.findOne({ email }).exec();
};

/**
 * Mencari satu pengguna berdasarkan email, TAPI sertakan field password.
 * Ini kita butuhkan untuk proses login.
 */
const findByEmailWithPassword = async (email: string): Promise<IUser | null> => {
  return UserModel.findOne({ email }).select('+password').exec();
};

/**
 * Membuat dan menyimpan dokumen pengguna baru.
 */
const create = async (userData: RegisterUserDto): Promise<IUser> => {
  const newUser = new UserModel(userData);
  return newUser.save();
};  

export default {
  findByEmail,
  findByEmailWithPassword,
  create,
};