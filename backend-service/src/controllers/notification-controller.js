
import { Notification } from '../models/NotificationModel/NotificationModel.js';

export const notificationResource = async (req, res) => {
  const body = req.body
  try {
  if (req.method == 'GET') {
    const notification = await Notification.find({ userId: req.user._id }).sort({ createdAt: 'desc' })
    return res.status(200).json({
      status: 'success',
      data: notification
    });
  }

  if (req.method == 'POST') {
    const notification = await Notification.findOneAndUpdate(
      { _id: body._id, userId: req.user._id }, {
      isRead: true
    })
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
