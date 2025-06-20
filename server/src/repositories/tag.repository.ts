import { CreateTagDto, UpdateTagDto } from '../dtos/tag.dto';
import TagModel, { ITag } from '../models/tag.model';

const create = async (tagData: CreateTagDto): Promise<ITag> => {
  const newTag = new TagModel(tagData);
  return newTag.save();
};

const findAll = async (): Promise<ITag[]> => {
  return TagModel.find().sort({ name: 1 }).exec();
};

const findById = async (id: string): Promise<ITag | null> => {
  return TagModel.findById(id).exec();
};

const updateById = async (id: string, updateData: UpdateTagDto): Promise<ITag | null> => {
  return TagModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

const deleteById = async (id: string): Promise<ITag | null> => {
  return TagModel.findByIdAndDelete(id).exec();
};

export default {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};