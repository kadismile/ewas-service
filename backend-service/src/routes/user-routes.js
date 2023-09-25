import express from 'express';
import { createUser, loginUser, changePassword } from '../controllers/user-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'

const router = express.Router();
router.post('/create', createUser)
router.post('/login', loginUser)
router.post('/change-password', protectedRoute, changePassword)

export default router;