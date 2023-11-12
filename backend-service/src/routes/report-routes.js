import express from 'express';
import { reportType, createReporter, loginReporter, 
  createReport, getReporters, createAdminReportType, 
  getReports, getOneReport, acceptReport, verifyReport,getAdvanced
} from '../controllers/report-controller.js';
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js';
import { upload } from '../helpers/file-upload-helper.js';

const router = express.Router();
router.post('/type',  reportType);
router.post('/type/admin',  createAdminReportType);
router.get('/type', reportType);
router.post('/', createReporter);
router.get('/reporter', protectedRoute, authorize(['superAdmin']), getReporters);
router.post('/login', loginReporter);

router.post('/create', upload.array('fileUpload'), createReport);
router.get('/', protectedRoute, authorize(['superAdmin']), getReports);
router.get('/one', protectedRoute, authorize(['superAdmin']), getOneReport);
router.post('/accept', protectedRoute, authorize(['superAdmin']), acceptReport);
router.post('/verify', protectedRoute, authorize(['superAdmin']), verifyReport);
router.get('/get-advanced', protectedRoute, authorize(['superAdmin']), getAdvanced);


export default router;