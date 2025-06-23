import { Router } from 'express';
import { 
    createCategoryHandler,
    getAllCategoriesHandler,
    getCategoryByIdHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from '../controllers/category.controller';

const router = Router();

router.get('/', getAllCategoriesHandler);
router.get('/:id', getCategoryByIdHandler);

// Rute Terproteksi (hanya user login)
router.post('/', createCategoryHandler);
router.patch('/:id', updateCategoryHandler);
router.delete('/:id', deleteCategoryHandler);

export default router;