import { Router } from 'express';
// import { protect } from '../middleware/auth.middleware';
import { 
    createTagHandler,
    getAllTagsHandler,
    getTagByIdHandler,
    updateTagHandler,
    deleteTagHandler
} from '../controllers/tag.controller';

const router = Router();

// Rute Publik
router.get('/', getAllTagsHandler);
router.get('/:id', getTagByIdHandler);

// Rute Terproteksi
router.post('/', createTagHandler);
router.patch('/:id', updateTagHandler);
router.delete('/:id', deleteTagHandler);

export default router;