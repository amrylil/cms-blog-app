import tagRepository from '../repositories/tag.repository';
import { CreateTagDto, UpdateTagDto } from '../dtos/tag.dto';

const createTag = (tagData: CreateTagDto) => {
  return tagRepository.create(tagData);
};

const getAllTags = () => {
  return tagRepository.findAll();
};

const getTagById = (id: string) => {
  return tagRepository.findById(id);
};

const updateTag = (id: string, updateData: UpdateTagDto) => {
  return tagRepository.updateById(id, updateData);
};

const deleteTag = (id: string) => {
  return tagRepository.deleteById(id);
};

export default {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};