import { newNotificationMessage } from "../../helpers/notification-helpers.js"
import { Department } from "../DepartmentModel/DepartmentModel.js"
import { ReportHistory } from "../ReportHistoryModel/ReportHistoryModel.js"
import { Notification } from "../NotificationModel/NotificationModel.js"
import { User } from "../UserModel/UserModel.js"
import { Report } from "../ReportModel/Report.js"
import { DraftReport } from "./DraftReport.js"

export const reportsAfterSave = async (report) => {
  const CAMS_DEPARTMENT = process.env.CAMS_DEPARTMENT
  // send Notifications to CAMS department ensure the ID is a CAMS _id
  const department = await Department.findOne({ _id: CAMS_DEPARTMENT })
  if (department) {
    const users = await User.find({ department: CAMS_DEPARTMENT })
    await Report.findOneAndUpdate(
      { _id: report._id },
      { departmentId: CAMS_DEPARTMENT }
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
    currentDepartment: CAMS_DEPARTMENT,
    reportUserHistory: null,
    nextActionableDept: CAMS_DEPARTMENT
  };
  
  const updatedReport = await Report.findOneAndUpdate({ _id: report._id }, {
    actionableUsers,
  },{new: true}).lean()

  const drafReport = await DraftReport.findOne({ reportId: report._id}) 
  if (!drafReport) {
    updatedReport.reportId = updatedReport._id;
    delete updatedReport._id
    const newDraftReport = new DraftReport(updatedReport)
    await newDraftReport.save()
  }

  // add to report history
  const historyData = {
    comment: "a new report as just been created and moved to CAMS department",
    reportId: report._id,
  }
  const history = new ReportHistory(historyData)
  await history.save()
  return true
}
