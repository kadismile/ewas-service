import { newNotificationMessage } from "../../helpers/notification-helpers.js"
import { Department } from "../DepartmentModel/DepartmentModel.js"
import { Notification } from "../NotificationModel/NotificationModel.js"
import { User } from "../UserModel/UserModel.js"


export const smsReportsAfterSave = async (report) => {
  const CAMS_DEPARTMENT = process.env.CAMS_DEPARTMENT
  const department = await Department.findOne({ _id: CAMS_DEPARTMENT })
  if (department) {
    const users = await User.find({ department: CAMS_DEPARTMENT })
    for (const userData of users) {
      try {
        const notifData = {
          userId: userData._id,
          report: report._id,
          message: newNotificationMessage(report),
        }
        const notification = new Notification(notifData)
        await notification.save();
      } catch (error) {
        console.error("Error creating notification:", error)
      }
    }
  }

  return true
}
