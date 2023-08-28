import express from 'express';
import { createComplainer } from '../controllers/complainer-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'

const router = express.Router();
router.post('/', protectedRoute, authorize(['superAdmin']), createComplainer)

export default router;