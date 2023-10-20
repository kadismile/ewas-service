import { Notification } from "../models/NotificationModel/NotificationModel.js"
import { User } from "../models/UserModel/UserModel.js"

export const newNotificationMessage = (data) => {
  return `<a href="${process.env.DASHBOARD_URL}report/${data._id}"> ${data.title} </a>`
}


export const sendCPSnotification = async (report) => {
  const CPS_DEPARTMENT = process.env.CPS_DEPARTMENT
  const users = await User.find({ department: CPS_DEPARTMENT })
  const message = `<a href="${process.env.DASHBOARD_URL}report/${report._id}"> ${report.title} </a>`
  if (users.length) {
    for (const userData of users) {
      try {
        const notifData = {
          userId: userData._id,
          message
        };
        const notification = new Notification(notifData);
        await notification.save();
      } catch (error) {
        console.error('Error creating notification:', error);
      }
    }
  }
}