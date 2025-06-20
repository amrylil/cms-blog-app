// routes/post.routes.ts
import { Router } from 'express';
import { createPostHandler, deletePostHandler, getAllPostsHandler, getPostHandler, updatePostHandler } from '../controllers/post.controller';

const router = Router();

router.get('/', getAllPostsHandler);

router.post('/', createPostHandler);

router.get('/:slug', getPostHandler);

router.patch('/:slug', updatePostHandler);

router.delete('/:slug', deletePostHandler);

export default router;
