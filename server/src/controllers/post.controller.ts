// file: src/controllers/post.controller.ts

import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import postService from '../services/post.service';

/**
 * Handler untuk membuat post baru.
 * Menerima data lengkap (termasuk author) dari Admin.
 */
export const createPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Validasi body request menggunakan DTO yang sudah lengkap
    const createPostDto = plainToInstance(CreatePostDto, req.body);
    const errors = await validate(createPostDto);

    if (errors.length > 0) {
      return res.status(400).json({ 
        message: 'Input validation failed', 
        errors: errors.map(err => Object.values(err.constraints || {})).flat() 
      });
    }
    
    // 2. Langsung panggil service dengan DTO.
    // Logika validasi author, kategori, dll. sudah ditangani di dalam service.
    const newPost = await postService.createPost(createPostDto);
    
    // 3. Kirim response sukses
    return res.status(201).json({
      message: 'Post created successfully',
      data: newPost,
    });
    
  } catch (error: any) {
    // 4. Tangani error spesifik dari service
    if (
      error.message === 'A post with this title already exists.' ||
      error.message === 'Author not found.' ||
      error.message === 'Category not found.' ||
      error.message === 'One or more tags not found.'
    ) {
      return res.status(400).json({ message: error.message });
    }
    // Untuk error lainnya, lempar ke middleware penangan error pusat
    return next(error);
  }
};

/**
 * Handler untuk mengambil semua post.
 */
export const getAllPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await postService.findAllPosts();
    return res.status(200).json({
      message: 'Posts fetched successfully',
      data: posts,
    });
  } catch (error: any) {
    return next(error);
  }
};

/**
 * Handler untuk mengambil satu post berdasarkan slug.
 */
export const getPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const post = await postService.findPostBySlug(slug);

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

/**
 * Handler untuk mengupdate post berdasarkan slug.
 */
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

    const updatedPost = await postService.updatePost(slug, updatePostDto);

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

/**
 * Handler untuk menghapus post berdasarkan slug.
 */
export const deletePostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const deletedPost = await postService.deletePost(slug);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({
      message: 'Post deleted successfully',
    });
  } catch (error: any) {
    return next(error);
  }
};
