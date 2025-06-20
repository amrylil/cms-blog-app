// src/services/auth.service.ts

import userRepository from '../repositories/user.repository';
import { RegisterUserDto, LoginUserDto } from '../dtos/auth.dto';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const registerUser = async (userData: RegisterUserDto) => {
  const existingUser = await userRepository.findByEmail(userData.email);
  if (existingUser) {
    throw new Error('Email already in use.');
  }

  const newUser = await userRepository.create(userData);
  newUser.password = undefined;
  return newUser;
};

const loginUser = async (loginData: LoginUserDto) => {
  const user = await userRepository.findByEmailWithPassword(loginData.email);
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isPasswordMatch = await user.comparePassword(loginData.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password.');
  }

  if (!config.jwtSecret) {
    throw new Error('JWT secret not configured.');
  }

  const token = jwt.sign(
  { id: user._id, role: user.role },
  config.jwtSecret as string,
  { expiresIn: 20 }
);

  user.password = undefined;
  return { user, token };
};


export default {
  registerUser,
  loginUser,
};