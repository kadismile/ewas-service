import express from 'express';
import { reportType, createReporter } from '../controllers/report-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'

const router = express.Router();
router.post('/type', protectedRoute, authorize(['superAdmin']), reportType)
router.get('/type', protectedRoute, authorize(['superAdmin']), reportType)
router.post('/', protectedRoute, authorize(['superAdmin'], createReporter))

export default router;