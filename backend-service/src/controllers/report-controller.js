
import { Report } from '../models/ReportModel/Report.js';
import { ReportType } from '../models/ReportTypeModel/ReportTypeModel.js';
import { agency_validation } from '../validations/crud-validations.js'
import { user_login_validation } from '../validations/user-validations.js'
import { Reporter } from '../models/ReportModel/ReporterModel.js';
import { Paginator } from '../helpers/paginator-helper.js';
import { AdminReportType } from '../models/ReportTypeModel/AdminReportTypeModel.js';
import { manageFileUpload } from '../helpers/file-upload-helper.js';
import { ReportHistory } from '../models/ReportHistoryModel/ReportHistoryModel.js';
import { User } from '../models/UserModel/UserModel.js';
import { Agency } from '../models/AgencyModel/AgencyModel.js';
import { Department } from '../models/DepartmentModel/DepartmentModel.js';
import { sendNotification } from '../helpers/notification-helpers.js';
import { sendSMS } from '../helpers/sms-helper.js';
import { DraftReport } from '../models/ReportModel/DraftReport.js';
import { Verification } from '../models/VerificationModel/VerificationModel.js';
import { SMSReport } from '../models/ReportModel/SMSReport.js';
import { sendReportsToAgenciesEmail, sendReportsToDepartmentEmail } from '../helpers/user-helper.js';
import { advancedResults } from '../helpers/advanced-results.js';


export const createReporter = async (req, res) => {
  try {
  const body = req.body
  /* const { error } = create_reporter_validation.validate(body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } */
  let { fullName, phoneNumber, email, password, address, gender } = req.body;
  let reporter = await findReporterByEmailOrPhone(phoneNumber, email);


  if (reporter) {
    return res.status(401).json({
      status: 'failed',
      message: `Reporter Already Exist with Credentials Provided.`,
    })
  }

  reporter = new Reporter({
    email, fullName, phoneNumber,
    password,address, gender
  });

  const token = reporter.getSignedJwtToken();
  await reporter.save();
  delete reporter._doc.password;

  if (reporter) {
    return res.status(201).json({
      status: 'success',
      data: reporter,
      token
    });
  }
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}

export const createReportBySMS = async (req, res) => {
  try {
  const { sender, message, ref, date } = req.body
  const smsReport = new SMSReport({
    sender, message, ref, date
  });
  await smsReport.save();
  return res.status(200).json({
    status: 'success',
    data: req.body,
  });
  } catch (error) {
    console.log('Error', error)
  }
}

export const getSMSReport = async (req, res) => {
  try {
  const smsReports = await SMSReport.find({}).sort({ createdAt: 'desc' })
  return res.status(200).json({
    status: 'success',
    data: smsReports
  });
  } catch (error) {
    console.log('Error', error)
  }
}

export const loginReporter = async (req, res) => {
  const body = req.body
  const { email, password } = body;

  try {
    const { error } = user_login_validation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const reporter = await Reporter.findOne({ email: email });
    if (!reporter) {
      return res.status(401).json(
        { 
          status: "failed",
          message: "invalid credentials"
      });
    }
    
    const isMatch = await reporter.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json(
        { 
          status: "failed",
          message: "invalid credentials"
      });
    } else {
      const token = reporter.getSignedJwtToken();
      delete reporter._doc.password;

      res.status(200).json({
        status: "success",
        token,
        data: reporter
      });

    }
  } catch (e) {
      console.log('Error', e)
      return res.status(500).json({
        status: "error",
        message: e
    });
  }
};

export const reportType = async (req, res) => {
  const body = req.body
  console.log("we are here -----------------------")
  if (req.method == 'GET') {
    const reportType = await ReportType.find({})
    return res.status(200).json({
      status: 'success',
      data: reportType
    });
  }

  
  try {
    const reportType = new ReportType(body);
    await reportType.save();
    if (reportType) {
      return res.status(201).json({
        status: 'success',
        data: reportType
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}

export const createReport = async (req, res) => {
  const body = req.body
  let newAddress = JSON.parse(body.address)
  delete body.address
  body.address = newAddress;

  try {
   /*  const { error } = create_report_validation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } */

  const CAMS_DEPARTMENT = process.env.CAMS_DEPARTMENT  
  const report = new Report(body);
  await report.save();

  if (report) {
    if (req?.file) {
      req.files = [req.file]
    } else {
      for (let file of req.files) {
        const { path, filename } = file
        await manageFileUpload(path, filename, report, 'reports')
      }
    }
    await sendReportsToDepartmentEmail(CAMS_DEPARTMENT, report.reportSlug)
    return res.status(201).json({
      status: 'success',
      data: report
    });
  }
  } catch (e) {
      console.log('Error', e)
      return res.status(500).json({
        status: "error",
        message: e
    });
  }
}

export const createAdminReportType = async (req, res) => {
  const body = req.body
  const { error } = agency_validation.validate(body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const reportType = new AdminReportType(body);
    await reportType.save();
    if (reportType) {
      return res.status(201).json({
        status: 'success',
        data: reportType
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}

export const getReporters = async (req, res) => {
  try {
    const reporters = await Paginator({...req.query}, Reporter, []);
    res.status(200).json({
      status: "success",
      data: reporters
    });
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const getReports = async (req, res) => {
  try {
    const populate = [
      ['reportTypeId'], 
      ['agencyId'],
      ['attachments'],
      ['userId'],
    ]

    const reporters = await Paginator({...req.query}, Report, populate);
    res.status(200).json({
      status: "success",
      data: reporters
    });
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const getUserReports = async (req, res) => {
  return getReports(req, res)
}

export const getOneReport = async (req, res) => {
  try {
    const reportSlug = req.query.reportSlug
    let report
    /* if (req.user.role === 'responder') {
      const agencies = await Agency.find({})
      const agencyIds = agencies.map( agency => agency.id )
      report = await Report.findOne({ 'actionableUsers.agencyId': { $in: agencyIds }, reportSlug })
    } else { */
      report = await Report.findOne({ reportSlug })
    //}
    await report.populate('attachments')
    await report.populate('agencyId')
    await report.populate('reportTypeId')
    await report.populate('userId')
    await report.populate('actionableUsers.currentUser')
    await report.populate('actionableUsers.currentDepartment');

    const reportHistory = await ReportHistory.find({reportId: report?._id}).sort({ createdAt: -1 })
    const draftReport = await DraftReport.findOne({reportId: report?._id})
    res.status(200).json({
      status: "success",
      data: { report, reportHistory, draftReport }
    });
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const acceptReport = async (req, res) => {
  try {
    const{ reportId, userId, responder } = req.body;
    const user = req.user
    const report = await Report.findOne({ _id: reportId }).lean();
    if (report?.actionableUsers?.curentUser?.length) {
      const alreadyAssignedUser = await User.findOne({ _id: report.actionableUsers.currentUser }).populate('department');
      if (alreadyAssignedUser) {
        return res.status(200).json({
          status: "success",
          message: `
          Report Already Assigned to ${alreadyAssignedUser.fullName}
          of ${alreadyAssignedUser.department.acronym} department`
        });
      }
    } else {
      await updateActonableUser(userId, user.department, report, user.department, false, responder)

      const comment =  `report assigned to ${user.fullName}`
      await addHistory(user, report, comment)

      res.status(201).json({
        status: "success",
        message: 'report assigned successfully'
      });
    }
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const editReport = async (req, res) => {
  try {
    const{ 
      reportId, userId, resolved, numberDisplaced,finalAddress,
      numberInjured, numberKilled, description 
    } = req.body;
    
    let report = await Report.findOne({ _id: reportId }).lean() ;
    if (report) {
      await Report.findOneAndUpdate({ _id: reportId},
        { $set:
          { address: finalAddress, 
            userId, numberKilled,
            resolved, numberInjured,
            numberDisplaced, description,
          } 
        })
      const historyData = {
        user: userId,
        reportId,
        comment: `report updated by ${req.user.fullName}`
      }
      const history = new ReportHistory(historyData)
      await history.save()
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: 'report not found'
      });
    }
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const verifyReport = async (req, res) => {
  try {
    const { comments, reportId, verificationMethod, addminReportType,
            responder, userId, reportStatus, responderVeriMethod } = req.body
    const report = await Report.findOne({ _id: reportId }).lean()
    const user = req.user;

    if (report && report?.actionableUsers?.currentUser === userId) {
      const department = await Department.findOne({ _id: req.user.department })
      const { acronym } = department
      const reportType = await AdminReportType.findOne({ name: addminReportType })
      const nextActionableDept = await getNextActionableDept(acronym, responder, reportType)

      await updateActonableUser(userId, department._id, report, nextActionableDept, true, responder)
      const comment =  `report verified by ${user.fullName} of ${acronym} Department`
      await addHistory(user, report, comment)

      await createVerification(user, reportId, verificationMethod, comments)
      await createNotification(report, acronym)
    
      
      if (responder?.length) {
        const agencies = await Agency.find({ _id: { $in: responder } })
        if (agencies.length) {
          const body = 'An SMS is sent your way kindly read it '
          // await sendSMS(body, agency?.phoneNumbers)
          await sendReportsToAgenciesEmail(agencies, report.reportSlug)
        }
      }

      if (user.role === "responder") {
        await Report.findOneAndUpdate({ _id: report._id }, {
          responderVeriMethod,
          status: reportStatus
        })
      }
      res.status(200).json({
        status: "success",
        message: 'report was succsfuly verified '
      });
    }
  } catch (error) {
    console.log('Error ', error)
  }
}

export const getAdvanced = async (req, res) => {
  const { populate, select } = req.query;

  const department = await Department.findOne({ _id: req.user.department })
  const { CIDS_DEPARTMENT, CPS_DEPARTMENT } = process.env;

  let reports

  if (req.user.role === 'responder') {
    const agencies = await Agency.find({})
    const agencyIds = agencies.map( agency => agency.id )
    reports = await Report.find({ 'actionableUsers.agencyId': { $in: agencyIds } }).sort({ createdAt: 'desc' })
    reports = { data: reports }
  } else if (department.id == CPS_DEPARTMENT || department.id == CIDS_DEPARTMENT) {
    reports = await Report.find({ 'actionableUsers.nextActionableDept': department._id }).sort({ createdAt: 'desc' })
    reports = { data: reports }
  } else {
    reports = await advancedResults(req, Report, populate, select);
  }
  
  return res.status(200).json({
    status: "success",
    data: reports
  });
};

export const getVerifications = async (req, res) => {
  try {
    const reportId = req.query.reportId
    const verifications = await Verification.find({ reportId }).populate('userId');
    res.status(200).json({
      status: "success",
      data: verifications
    });
  } catch (error) {
    console.log('Error ------>>', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
};

export const getDraftReport = async (req, res) => {
  try {
    const reportId = req.query.reportId
    const draftReport = await DraftReport.findOne({ reportId })
    .populate('attachments')
    .populate('agencyId')
    .populate('reportTypeId')
    .populate('userId')
    .populate('actionableUsers.currentUser')
    .populate('actionableUsers.currentDepartment');

    res.status(200).json({
      status: "success",
      data: draftReport 
    });
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const deleteReport = async (req, res) => {
  const { _id } = req.body
  const report = await Report.find({_id})
  if (report) {
    await Report.findOneAndUpdate({ _id }, {
      isActive: false
    })
    res.status(200).json({
      status: 'success',
      message: 'Report Deleted'
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Cannot Deleted Department '
    });
  }
}

export const getReportStats = async (req, res) => {
    const reportStats = await Report.aggregate([
      {
        $facet: {
          totalReports: [{ $count: 'count' }],
          totalIncidents: [
            {
              $match: {
                type: 'incident',
              },
            },
            { $count: 'count' },
          ],
          totalConflicts: [
            {
              $match: {
                type: 'conflict',
              },
            },
            { $count: 'count' },
          ],
          totalResolved: [
            {
              $match: {
                status: 'resolved',
              },
            },
            { $count: 'count' },
          ],
          totalUnresolved: [
            {
              $match: {
                status: 'unresolved',
              },
            },
            { $count: 'count' },
          ],
          totalFalseReports: [
            {
              $match: {
                verified: 'false-report',
              },
            },
            { $count: 'count' },
          ],
        },
      },
      {
        $project: {
          totalReports: { $ifNull: [{ $arrayElemAt: ['$totalReports.count', 0] }, 0] },
          totalIncidents: { $ifNull: [{ $arrayElemAt: ['$totalIncidents.count', 0] }, 0] },
          totalConflicts: { $ifNull: [{ $arrayElemAt: ['$totalConflicts.count', 0] }, 0] },
          totalResolved: { $ifNull: [{ $arrayElemAt: ['$totalResolved.count', 0] }, 0] },
          totalUnresolved: { $ifNull: [{ $arrayElemAt: ['$totalUnresolved.count', 0] }, 0] },
          totalFalseReports: { $ifNull: [{ $arrayElemAt: ['$totalFalseReports.count', 0] }, 0] },
        },
      },
    ]);

    return res.status(200).json({
      status: 'success',
      data: reportStats[0]
    });
}

export const deleteReporter = async (req, res) => {
  const { _id } = req.body
  const reporter = await Reporter.find({_id})
  if (reporter) {
    await Reporter.findOneAndUpdate({ _id }, {
      isActive: false
    })
    res.status(200).json({
      status: 'success',
      message: 'Reporter Deleted'
    });
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'Cannot Deleted Reporter '
    });
  }
}

export const editReportType = async (req, res) => {
  try {
    const{ 
      name, _id
    } = req.body;
    
    let report = await ReportType.findOne({ _id }).lean() ;
    if (report) {
      await ReportType.findOneAndUpdate({ _id },{ name } )
  
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: 'reporttype not found'
      });
    }
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const deleteReportType = async (req, res) => {
  const body = req.body
  const reportType = await ReportType.findOne({ _id: body._id })
  if (reportType) {
    await ReportType.deleteOne({ _id: reportType._id })
  }
  return res.status(200).json({
    status: 'success',
  });
}

const findReporterByEmailOrPhone = async (phoneNumber, email) => {
  const reporter = await Reporter.findOne({
    $or: [
      { email },
      { phoneNumber }],
  }).select('+password');
  if (!reporter) {
    return null;
  }
  return reporter;
};

const createNotification = async (report, departmentAcronym) => {
  const CAMS_DEPT = process.env.CAMS_DEPARTMENT
  const CPS_DEPT = process.env.CPS_DEPARTMENT
  const RESPONDER_DEPT = process.env.RESPONDER_DEPT
  switch (departmentAcronym) {
    case "CAMS":
      await sendNotification(report, CAMS_DEPT)
      break;
    case "CPS":
      await sendNotification(report, CPS_DEPT)
        break;  
    case "Responder":
      await sendNotification(report, RESPONDER_DEPT)
      break;
    default:
      break;
  }
  return true
}

const addHistory = async (user, report, comment) => {
  const historyData = {
    user: user._id,
    reportId: report._id,
    comment
  }
  const history = new ReportHistory(historyData)
  await history.save()
  return 
}

const updateActonableUser = async (userId, department, report, nextActionableDept, unassign, responder) => {

  const actionableUsers = {
    currentUser: unassign ? null : userId,
    currentDepartment: unassign ? null : department,
    reportUserHistory: report.reportUserHistory?.length ? 
      report.actionableUsers?.reportUserHistory?.push(userId) : [userId],
    nextActionableDept: nextActionableDept, 
    agencyId: responder?.length ? responder : [],
  };
  await Report.findOneAndUpdate({ _id: report._id }, {
    actionableUsers
  })
  await sendReportsToDepartmentEmail(nextActionableDept, report.reportSlug)
  return 
}

const createVerification = async (user, reportId, verificationMethod, comments) => {
  const verificationData = {
    departmentId: user.department,
    userId: user._id,
    reportId,
    verificationMethod,
    comments
  }
  const verification = new Verification(verificationData)
  await verification.save()
  return 
}

const getNextActionableDept = async (acronym, responder, reportType) => {

  if (acronym === 'CAMS') {
    if (reportType?.name == 'incident') {
      const dept = await Department.findOne({ acronym: 'CIDS'}) 
      if (dept) {
        return dept.id
      }
    }
    const dept = await Department.findOne({ acronym: 'CPS'}) 
    if (dept) {
      return dept.id
    }
  }

  if (acronym === 'CPS') {
    const agency = await Agency.findOne({ _id: responder })
    if (agency) {
      return agency.id
    }
  }

  if (acronym === 'Responder') {
    const dept = await Department.findOne({ acronym: 'CIDS'})
    if (dept) {
      return dept.id
    }
  }

  if (responder && acronym === 'CPS') {
    return responder
  }
}
