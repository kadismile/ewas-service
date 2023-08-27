import express from 'express';
import { departmentResource } from '../controllers/department-controller.js'

const router = express.Router();
router.get('/', departmentResource)
router.post('/', departmentResource)

export default router;