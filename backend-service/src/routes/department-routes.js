import express from 'express';
import { departmentResource } from '../controllers/department-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'
import { DEPARTMENT_PERMISSIONS } from '../lib/permissions.js';

const router = express.Router();
router.get('/', protectedRoute, authorize(DEPARTMENT_PERMISSIONS), departmentResource)
router.delete('/', protectedRoute, authorize(['superAdmin']),departmentResource)
router.patch('/',protectedRoute, authorize(['superAdmin']), departmentResource)
router.post('/',  protectedRoute, authorize(['superAdmin']), departmentResource)

export default router;