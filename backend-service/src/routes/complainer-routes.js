import express from 'express';
import { createComplainer } from '../controllers/complainer-controller.js'

const router = express.Router();
router.post('/', createComplainer)

export default router;