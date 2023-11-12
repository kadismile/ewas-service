
import { Report } from '../models/ReportModel/Report.js';
import { create_reporter_validation } from '../validations/reporter-validations.js'
import { ReportType } from '../models/ReportTypeModel/ReportTypeModel.js';
import { agency_validation } from '../validations/crud-validations.js'
import { user_login_validation } from '../validations/user-validations.js'
import { create_report_validation } from '../validations/reporter-validations.js'
import { Reporter } from '../models/ReportModel/ReporterModel.js';
import { Paginator } from '../helpers/paginator-helper.js';
import { AdminReportType } from '../models/ReportTypeModel/AdminReportTypeModel.js';
import { manageFileUpload } from '../helpers/file-upload-helper.js';
import { ReportHistory } from '../models/ReportHistoryModel/ReportHistoryModel.js';
import { User } from '../models/UserModel/UserModel.js';
import { Agency } from '../models/AgencyModel/AgencyModel.js';
import { Department } from '../models/DepartmentModel/DepartmentModel.js';
import { sendCPSnotification } from '../helpers/notification-helpers.js';
import { sendSMS } from '../helpers/sms-helper.js';
import {advancedResults} from "../helpers/advanced-results.js";


export const createReporter = async (req, res) => {
  try {
  const body = req.body
  const { error } = create_reporter_validation.validate(body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  let { fullName, phoneNumber, email, password, address, } = req.body;
  let reporter = await findReporterByEmailOrPhone(phoneNumber, email);


  if (reporter) {
    return res.status(401).json({
      status: 'failed',
      message: `Reporter Already Exist with Credentials Provided.`,
    })
  }

  reporter = new Reporter({
    email, fullName, phoneNumber, password,address,
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
  if (req.method == 'GET') {
    const reportType = await ReportType.find({})
    return res.status(200).json({
      status: 'success',
      data: reportType
    });
  }
  const { error } = agency_validation.validate(body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
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
  body.address = newAddress
  const { reporterId } = body;

  try {
    /* const { error } = create_report_validation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } */

  let reporter
  if (reporterId && reporterId !== 'anonymous') {
    reporter = await Reporter.findById(reporterId)
    if (!reporter) {
      res.status(401).json({ error: "No reporter found"});
    }
  }

  const report = new Report(body);
  await report.save();

  if (report) {
    if (req?.file) {
      req.files = [req.file]
    } else {
      for (let file of req.files) {
        const { path, filename } = file
        await manageFileUpload(path, filename, report)
      }
    }
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

export const getOneReport = async (req, res) => {
  try {
    const reportSlug = req.query.reportSlug
    const report = await Report.findOne({ reportSlug })
    .populate('attachments')
    .populate('agencyId')
    .populate('reportTypeId')
    .populate('userId');

    const reportHistory = await ReportHistory.find({reportId: report?._id})
    res.status(200).json({
      status: "success",
      data: { report, reportHistory }
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
    const{ reportId, userId } = req.body;
    const report = await Report.findOne({ _id: reportId });
    if (report.userId) {
      const alreadyAssignedUser = await User.findOne({ _id: report.userId}).populate('department')
      if (alreadyAssignedUser?.department._id == req.user.department) {
        return res.status(200).json({
          status: "success",
          message: `
          Report Already Assigned to ${alreadyAssignedUser.fullName}
          of ${alreadyAssignedUser.department.acronym} department`
        });
      }
    } else {
      await Report.findOneAndUpdate({_id: reportId}, {
        userId,
      })
      const historyData = {
        user: userId,
        reportId,
        comment: `report assigned to ${req.user.fullName}`
      }
      const history = new ReportHistory(historyData)
      await history.save()
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

export const verifyReport = async (req, res) => {
  try {
    const { comments, verified, reportId, userId, verificationMethod, responder } = req.body
    const report = await Report.findOne({ _id: reportId })

    if (report && report.userId === userId) {
      const CPS_DEPARTMENT = process.env.CPS_DEPARTMENT
      await Report.findOneAndUpdate({_id: reportId}, {
        verified,
        userId: null, // making it null so the report will be un-assigned to the current user
        departmentId: CPS_DEPARTMENT,
        verificationMethod,
        responder
      })
      const historyData = {
        user: userId,
        reportId,
        comment: `${req.user.fullName} added a comment <br/>
        ${comments}`
      }
      const history = new ReportHistory(historyData)
      await history.save()
      const department = await Department.findOne({ _id: req.user.department })
      const { acronym } = department
      await createNotification(report, acronym)
      if (responder?.length) {
        const agency = await Agency.findOne({ _id: responder })
        if (agency.name) {
          const body = 'An SMS is sent your way kindly read it '
          await sendSMS(body, agency?.phoneNumbers)
        }
        
      }
     
      res.status(201).json({
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
  const transactions = await advancedResults(req, Report, populate, select);
  return res.status(200).json({
    status: "success",
    data: transactions
  });
};

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
  switch (departmentAcronym) {
    case "CIDS": // this should be CAMS though ..pls change it ibro tomorrow 
      // send Notiication to CPS because its CIDS, CIDS moves the workflow to CPS
      await sendCPSnotification(report)
      break;
    default:
      break;
  }
  return true
}
