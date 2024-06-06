import { Notification } from "../models/NotificationModel/NotificationModel.js"
import { User } from "../models/UserModel/UserModel.js"

export const newNotificationMessage = (data) => {
  return `<a href="${process.env.DASHBOARD_URL}report/${data.reportSlug}"> ${data.reportSlug} </a>`
}


export const sendNotification = async (report, department) => {
  const users = await User.find({ department })
  const message = `<a href="${process.env.DASHBOARD_URL}report/${report.reportSlug}"> ${report.reportSlug} </a>`
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
