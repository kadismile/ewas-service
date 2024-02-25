import { newNotificationMessage } from "../../helpers/notification-helpers.js"
import { Department } from "../DepartmentModel/DepartmentModel.js"
import { ReportHistory } from "../ReportHistoryModel/ReportHistoryModel.js"
import { Notification } from "../NotificationModel/NotificationModel.js"
import { User } from "../UserModel/UserModel.js"
import { Report } from "../ReportModel/Report.js"
import { DraftReport } from "./DraftReport.js"
import { SMSReport } from "./SMSReport.js"

export const reportsAfterSave = async (report) => {
  const smsReport = report.smsReport
  const CAMS_DEPARTMENT = process.env.CAMS_DEPARTMENT
  const SSS_DEPARTMENT = process.env.SSS_DEPARTMENT

  const department = await Department.findOne({ _id: smsReport ? SSS_DEPARTMENT : CAMS_DEPARTMENT })
  if (department) {
    const users = await User.find({ department: smsReport ? SSS_DEPARTMENT : CAMS_DEPARTMENT })
    await Report.findOneAndUpdate(
      { _id: report._id },
      { departmentId: smsReport ? SSS_DEPARTMENT : CAMS_DEPARTMENT }
    )
    for (const userData of users) {
      try {
        const notifData = {
          userId: userData._id,
          message: newNotificationMessage(report),
        }
        const notification = new Notification(notifData)
        await notification.save()
      } catch (error) {
        console.error("Error creating notification:", error)
      }
    }
  }

  const actionableUsers = {
    currentUser: null,
    currentDepartment: smsReport ? SSS_DEPARTMENT : CAMS_DEPARTMENT,
    reportUserHistory: null,
    nextActionableDept: smsReport ? SSS_DEPARTMENT : CAMS_DEPARTMENT
  };
  
  const updatedReport = await Report.findOneAndUpdate({ _id: report._id }, {
    actionableUsers,
  },{new: true}).lean()

  if (!smsReport) {
    const drafReport = await DraftReport.findOne({ reportId: report._id}) 
    if (!drafReport) {
      updatedReport.reportId = updatedReport._id;
      delete updatedReport._id
      const newDraftReport = new DraftReport(updatedReport)
      await newDraftReport.save()
    }
  }
  // update smsReport if any
  await SMSReport.findOneAndUpdate({ _id: report.smsReportId }, {
      reportCreated: true,
  },{new: true}).lean();

  // add to report history
  const historyData = {
    comment: comment(smsReport),
    reportId: report._id,
  }
  const history = new ReportHistory(historyData)
  await history.save()
  return true
}

const comment = (smsReport) => {
  if (smsReport) {
    return "a new report as just been created and moved to SSS department"
  } else {
    return "a new report as just been created and moved to CAMS department"
  }
}
