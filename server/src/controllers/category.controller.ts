import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import categoryService from '../services/category.service';

// Handler untuk membuat kategori baru
export const createCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCategoryDto = plainToInstance(CreateCategoryDto, req.body);
    const errors = await validate(createCategoryDto);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const category = await categoryService.createCategory(createCategoryDto);
    return res.status(201).json({ message: 'Category created', data: category });
  } catch (error) {
    return next(error);
  }
};

// Handler untuk mengambil semua kategori
export const getAllCategoriesHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await categoryService.getAllCategories();
        return res.status(200).json({ data: categories });
    } catch (error) {
        return next(error);
    }
}

// Handler untuk mengambil satu kategori by ID
export const getCategoryByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json({ data: category });
    } catch (error) {
        return next(error);
    }
}

// Handler untuk update kategori
export const updateCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateCategoryDto = plainToInstance(UpdateCategoryDto, req.body);
        const errors = await validate(updateCategoryDto);
        if (errors.length > 0) {
          return res.status(400).json({ message: 'Validation failed', errors });
        }
        
        const category = await categoryService.updateCategory(req.params.id, updateCategoryDto);
         if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json({ message: 'Category updated', data: category });
    } catch (error) {
        return next(error);
    }
}

// Handler untuk delete kategori
export const deleteCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
         if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json({ message: 'Category deleted', data: category });
    } catch (error) {
        return next(error);
    }
}