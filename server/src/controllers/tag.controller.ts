import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTagDto, UpdateTagDto } from '../dtos/tag.dto';
import tagService from '../services/tag.service';

export const createTagHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createTagDto = plainToInstance(CreateTagDto, req.body);
    const errors = await validate(createTagDto);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    const tag = await tagService.createTag(createTagDto);
    return res.status(201).json({ message: 'Tag created', data: tag });
  } catch (error) {
    return next(error);
  }
};

export const getAllTagsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tags = await tagService.getAllTags();
        return res.status(200).json({ data: tags });
    } catch (error) {
        return next(error);
    }
}

export const getTagByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tag = await tagService.getTagById(req.params.id);
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        return res.status(200).json({ data: tag });
    } catch (error) {
        return next(error);
    }
}

export const updateTagHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateTagDto = plainToInstance(UpdateTagDto, req.body);
        const errors = await validate(updateTagDto);
        if (errors.length > 0) {
          return res.status(400).json({ message: 'Validation failed', errors });
        }
        
        const tag = await tagService.updateTag(req.params.id, updateTagDto);
         if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        return res.status(200).json({ message: 'Tag updated', data: tag });
    } catch (error) {
        return next(error);
    }
}

export const deleteTagHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tag = await tagService.deleteTag(req.params.id);
         if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        return res.status(200).json({ message: 'Tag deleted', data: tag });
    } catch (error) {
        return next(error);
    }
}