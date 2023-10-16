import express from 'express';

import { 
  createUser, 
  loginUser,
  changePassword, 
  authorizeUser,
  getUsers,
} from '../controllers/user-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'

const router = express.Router();
router.post('/create', createUser)
router.post('/login', loginUser)
router.post('/change-password', protectedRoute, changePassword)
router.post('/authorized', protectedRoute, authorizeUser)
router.get('/users', protectedRoute, authorize(['superAdmin']), getUsers)

export default router;