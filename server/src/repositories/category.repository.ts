import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import CategoryModel, { ICategory } from '../models/category.model';

const create = async (categoryData: CreateCategoryDto): Promise<ICategory> => {
  const newCategory = new CategoryModel(categoryData);
  return newCategory.save();
};

const findAll = async (): Promise<ICategory[]> => {
  return CategoryModel.find().sort({ name: 1 }).exec();
};

const findById = async (id: string): Promise<ICategory | null> => {
  return CategoryModel.findById(id).exec();
};

const updateById = async (id: string, updateData: UpdateCategoryDto): Promise<ICategory | null> => {
  return CategoryModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

const deleteById = async (id: string): Promise<ICategory | null> => {
  return CategoryModel.findByIdAndDelete(id).exec();
};

export default {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};