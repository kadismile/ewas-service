import express from 'express';
import { createUser, loginUser } from '../controllers/user-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'

const router = express.Router();
router.post('/create', protectedRoute, authorize(['superAdmin']), createUser)
router.post('/login', protectedRoute, authorize(['superAdmin']), loginUser)

export default router;