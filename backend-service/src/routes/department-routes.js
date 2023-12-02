import express from 'express';
import { departmentResource } from '../controllers/department-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'
import { DEPARTMENT_PERMISSIONS } from '../lib/permissions.js';

const router = express.Router();
router.get('/', protectedRoute, departmentResource)
router.delete('/', protectedRoute,departmentResource)
router.patch('/',protectedRoute, departmentResource)
router.post('/',  protectedRoute, departmentResource)

export default router;