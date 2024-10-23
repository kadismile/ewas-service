import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: [true, 'Please Add userId']
  },
  reportId: {
    type: String,
    ref: 'Report',
    type: Schema.Types.ObjectId,
    required: [true, 'Please Add ReportId']
  },
  message: {
    type: String,
    required: [true, 'Please Add noticiation message']
  },
  isRead: {
    type: String, 
    default: 'not-read'
  },
  isActive : {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false });


notificationSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

notificationSchema.pre('find', async function() {
  this.where({ isActive: true })
});

export const Notification = model('Notification', notificationSchema);