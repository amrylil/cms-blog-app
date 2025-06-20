// file: src/controllers/post.controller.ts

import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import postService from '../services/post.service'; // Pastikan path ini benar

export const createPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Validasi body request menggunakan DTO (tanpa slug)
    const createPostDto = plainToInstance(CreatePostDto, req.body);
    const errors = await validate(createPostDto);

    if (errors.length > 0) {
      return res.status(400).json({ 
        message: 'Input validation failed', 
        errors: errors.map(err => Object.values(err.constraints || {})).flat() 
      });
    }
    
    // --- PERUBAHAN DI SINI ---
    // 2. Panggil 'postService.create', yang sekarang akan membuat slug secara internal
    const newPost = await postService.create(createPostDto);
    
    // 3. Kirim response sukses dengan data post yang lengkap (termasuk slug)
    return res.status(201).json({
      message: 'Post created successfully',
      data: newPost,
    });
    
  } catch (error: any) {
    // 4. Tangkap error dari service (misal, 'title already exists')
    if (error.message === 'A post with this title already exists.') {
      return res.status(400).json({ message: error.message });
    }
    // Untuk error lainnya, lempar ke middleware penangan error
    return next(error);
  }
};

export const getAllPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await postService.findAll();
    return res.status(200).json({
      message: 'Posts fetched successfully',
      data: posts,
    });
  } catch (error: any) {
    return next(error);
  }
};

export const getPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const post = await postService.findBySlug(slug);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({
      message: 'Post fetched successfully',
      data: post,
    });
  } catch (error: any) {
    return next(error);
  }
};

export const updatePostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    
    const updatePostDto = plainToInstance(UpdatePostDto, req.body);
    const errors = await validate(updatePostDto);
    if (errors.length > 0) {
      return res.status(400).json({ 
        message: 'Input validation failed', 
        errors: errors.map(err => Object.values(err.constraints || {})).flat() 
      });
    }

    const updatedPost = await postService.update(slug, updatePostDto);

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error: any) {
    if (error.message === 'A post with this title already exists.') {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
};

export const deletePostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const deletedPost = await postService.remove(slug);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({
      message: 'Post deleted successfully',
      data: deletedPost,
    });
  } catch (error: any) {
    return next(error);
  }
};