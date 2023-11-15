import express from 'express';

import { 
  createUser, 
  loginUser,
  changePassword, 
  authorizeUser,
  getUsers,
  getOneUser,
  suspendUser,
  resetPassword,
  verifyPassToken,
  sendResetPassEmail,
  addPermissions,
  addUserPermissions,
} from '../controllers/user-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'

const router = express.Router();
router.post('/create', createUser)
router.post('/login', loginUser)
router.post('/change-password', protectedRoute, changePassword)
router.post('/authorized', protectedRoute, authorizeUser)
router.get('/users', protectedRoute, authorize(['superAdmin']), getUsers)
router.get('/user/one', protectedRoute, authorize(['superAdmin']), getOneUser)
router.post('/user/suspend', protectedRoute, authorize(['superAdmin']), suspendUser)
router.post('/send-reset-password-email', sendResetPassEmail)
router.post('/verify-passwordToken', verifyPassToken)
router.post('/reset-password', resetPassword)

router.post('/add-user-permissions', protectedRoute, authorize(['superAdmin', 'admin']), addUserPermissions)
router.post('/add-system-permissions', protectedRoute, authorize(['superAdmin']), addPermissions)

export default router;
