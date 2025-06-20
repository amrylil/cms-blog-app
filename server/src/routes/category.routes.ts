import { Router } from 'express';
// import { protect } from '../middleware/auth.middleware';
import { 
    createCategoryHandler,
    getAllCategoriesHandler,
    getCategoryByIdHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from '../controllers/category.controller';

const router = Router();

// Rute Publik (siapa saja bisa melihat)
router.get('/', getAllCategoriesHandler);
router.get('/:id', getCategoryByIdHandler);

// Rute Terproteksi (hanya user login)
router.post('/', createCategoryHandler);
router.patch('/:id', updateCategoryHandler);
router.delete('/:id', deleteCategoryHandler);

export default router;