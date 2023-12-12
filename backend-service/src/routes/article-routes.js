import express from 'express';
import { articleResource, createArticle, editArticle } from '../controllers/article-controller.js'
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js'
import { upload } from '../helpers/file-upload-helper.js';

const router = express.Router();
router.get('/', articleResource)
router.post('/', protectedRoute, articleResource)
router.delete('/', protectedRoute, articleResource)
router.post('/create', upload.array('fileUpload'), createArticle);
router.patch('/edit', upload.array('fileUpload'), editArticle);

export default router;