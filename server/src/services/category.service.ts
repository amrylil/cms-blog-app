import categoryRepository from '../repositories/category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

const createCategory = (categoryData: CreateCategoryDto) => {
  return categoryRepository.create(categoryData);
};

const getAllCategories = () => {
  return categoryRepository.findAll();
};

const getCategoryById = (id: string) => {
  return categoryRepository.findById(id);
};

const updateCategory = (id: string, updateData: UpdateCategoryDto) => {
  return categoryRepository.updateById(id, updateData);
};

const deleteCategory = (id: string) => {
  return categoryRepository.deleteById(id);
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};