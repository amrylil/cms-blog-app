// src/routes/auth.routes.ts

import { Router } from 'express';
import { loginHandler, registerHandler } from '../controllers/auth.controller';

const router = Router();

// Endpoint untuk registrasi pengguna baru
router.post('/register', registerHandler);
router.post('/login', loginHandler);


// Kita akan menambahkan endpoint /login di sini nanti

export default router;