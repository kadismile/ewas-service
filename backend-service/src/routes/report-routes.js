import express from 'express';
import { reportType } from '../controllers/report-controller.js'

const router = express.Router();
router.post('/type', reportType)
router.get('/type', reportType)

export default router;