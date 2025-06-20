// src/controllers/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginUserDto,  RegisterUserDto } from '../dtos/auth.dto';
import authService from '../services/auth.service';

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerUserDto = plainToInstance(RegisterUserDto, req.body);
    const errors = await validate(registerUserDto);
    if (errors.length > 0) {
      return res.status(400).json({ 
        message: 'Input validation failed', 
        errors: errors.map(err => Object.values(err.constraints || {})).flat() 
      });
    }

    const newUser = await authService.registerUser(registerUserDto);

    return res.status(201).json({
      message: 'User registered successfully',
      data: newUser,
    });
  } catch (error: any) {
    if (error.message === 'Email already in use.') {
      return res.status(409).json({ message: error.message }); // 409 Conflict
    }
    return next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Validasi input (ini sudah benar)
    const loginUserDto = plainToInstance(LoginUserDto, req.body);
    const errors = await validate(loginUserDto);
    if (errors.length > 0) {
      return res.status(400).json({ 
        message: 'Input validation failed', 
        errors: errors.map(err => Object.values(err.constraints || {})).flat() 
      });
    }

    // 2. Panggil service login (ini sudah benar)
    // Variabelnya saya ganti agar lebih jelas
    const loginResult = await authService.loginUser(loginUserDto);

    // 3. Kirim response SUKSES yang TEPAT
    return res.status(200).json({ // <-- PERBAIKAN: Gunakan 200 OK
      message: 'Login successful', // <-- PERBAIKAN: Pesan yang sesuai
      data: loginResult, // berisi { user, token }
    });

  } catch (error: any) {
    // 4. Tangani error GAGAL LOGIN yang TEPAT
    if (error.message === 'Invalid email or password.') { 
      return res.status(401).json({ message: error.message });
    }
    // Untuk error tak terduga lainnya, lempar ke error handler pusat
    return next(error);
  }
};