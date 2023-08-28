import express from 'express';
import { agencyResource } from '../controllers/agency-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'

const router = express.Router();
router.get('/', protectedRoute, authorize(['superAdmin']), agencyResource)
router.post('/', protectedRoute, authorize(['superAdmin']), agencyResource)

export default router;