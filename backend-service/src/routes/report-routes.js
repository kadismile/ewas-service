import express from 'express';
import { reportType, createReporter, loginReporter, 
  createReport, getReporters, createAdminReportType, 
  getReports, getOneReport, acceptReport, verifyReport, 
  getAdvanced, editReport, getVerifications, getDraftReport,
  createReportBySMS, getSMSReport, getUserReports, deleteReport,getReportStats,
  deleteReporter
} from '../controllers/report-controller.js';
import {searchRsource} from '../controllers/search-controller.js';
import { protectedRoute, authorize } from '../middlewares/auth-middleware.js';
import { upload } from '../helpers/file-upload-helper.js';
import { REPORT_PERMISSIONS, REPORTERS_PERMISSIONS, RESPONDERS_PERMISSIONS } from '../lib/permissions.js';

const router = express.Router();
router.post('/type',  reportType);
router.post('/type/admin',  createAdminReportType);
router.get('/type', reportType);
router.post('/', createReporter);
router.post('/sms', createReportBySMS);
router.post('/sms-reports', getSMSReport);
router.get('/reporter', protectedRoute, authorize(REPORTERS_PERMISSIONS), getReporters);
router.post('/login', loginReporter);

router.post('/create', upload.array('fileUpload'), createReport);
router.get('/', protectedRoute, authorize(REPORT_PERMISSIONS), getReports);
router.get('/user-reports', getReports);
router.get('/verification', protectedRoute, getVerifications);
router.patch('/', protectedRoute, authorize(REPORT_PERMISSIONS), editReport);
router.get('/one', protectedRoute, authorize(REPORT_PERMISSIONS), getOneReport);
router.get('/draft', protectedRoute, authorize(REPORT_PERMISSIONS), getDraftReport);
router.post('/accept', protectedRoute, authorize(REPORT_PERMISSIONS), acceptReport);
router.post('/verify', protectedRoute, authorize(REPORT_PERMISSIONS), verifyReport);
router.get('/get-advanced', protectedRoute, authorize(REPORT_PERMISSIONS, RESPONDERS_PERMISSIONS), getAdvanced);
router.get('/get-stats', protectedRoute, getReportStats);
router.post('/search', protectedRoute, searchRsource);
router.delete('/', protectedRoute, authorize(REPORT_PERMISSIONS, RESPONDERS_PERMISSIONS), deleteReport);
router.delete('/reporters', protectedRoute, authorize(REPORTERS_PERMISSIONS), deleteReporter);


export default router;