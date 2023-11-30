import { Schema, model } from 'mongoose';

const verificationSchema = new Schema({
  departmentId: {
    type: String,
    ref: 'Department',
    required: [true, 'Please Add Department']
  },
  userId: {
    type: String,
    ref: 'User',
    required: [true, 'Please Add Department']
  },
  verificationMethod: {
    type: String,
  },
  reportId: {
    type: String,
  },
  comments: {
    type: String,
    required: [true, 'Please Add comments']
  },
  
},
{ timestamps: true, versionKey: false });


export const Verification = model('Verification', verificationSchema);