import express from 'express';
import { notificationResource,
} from '../controllers/notification-controller.js';
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js';


const router = express.Router();
router.get('/', protectedRoute, notificationResource);
router.post('/', protectedRoute, notificationResource);


export default router;