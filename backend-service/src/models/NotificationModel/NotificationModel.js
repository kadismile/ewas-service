import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: [true, 'Please Add userId']
  },
  message: {
    type: String,
    required: [true, 'Please Add noticiation message']
  },
  isRead: {
    type: Boolean, 
    default: false 
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