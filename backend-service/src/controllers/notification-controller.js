
import { Notification } from '../models/NotificationModel/NotificationModel.js';

export const notificationResource = async (req, res) => {
  const body = req.body
  try {

  if (req.method == 'GET') {
    const notification = await Notification.find({ userId: req.user._id })
    return res.status(200).json({
      status: 'success',
      data: notification
    });
  }

  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}
