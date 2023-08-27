import express from 'express';
import { agencyResource } from '../controllers/agency-controller.js'

const router = express.Router();
router.get('/', agencyResource)
router.post('/', agencyResource)

export default router;