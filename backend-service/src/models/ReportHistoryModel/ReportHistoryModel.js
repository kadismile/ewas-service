import { Schema, model } from 'mongoose';

const reportHistorySchema = new Schema({
  comment: {
    type: String,
    required: [true, 'Please Add Full Name']
  },
  status: {
    type: String,
    required: [true, 'Please Add status'],
    enum: ['processing', 'processed', 'rejected'],
    default: 'processing'
  },
  user: {
    type: Schema.Types.String,
    ref: 'User'
  },
  reporter: {
    type: Schema.Types.String,
    ref: 'Report'
  },
},{ timestamps: true, versionKey: false });


export const ReportHistory = model('ReportHistory', reportHistorySchema);
