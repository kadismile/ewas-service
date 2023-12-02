import express from 'express';
import { agencyResource } from '../controllers/agency-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'

const router = express.Router();
router.get('/', agencyResource)
router.post('/', protectedRoute, agencyResource)

export default router;