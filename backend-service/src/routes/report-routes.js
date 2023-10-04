import express from 'express';
import { reportType, createReporter, loginReporter, createReport } from '../controllers/report-controller.js';
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js';

const router = express.Router();
router.post('/type',  reportType);
router.get('/type', reportType);
router.post('/', createReporter);
router.post('/login', loginReporter);

router.post('/create', createReport);

export default router;