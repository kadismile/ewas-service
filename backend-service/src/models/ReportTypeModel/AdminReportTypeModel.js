import { Schema, model } from 'mongoose';

const adminReportTypeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please Add Name']
  },
  isActive : {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false });


adminReportTypeSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

adminReportTypeSchema.pre('find', async function() {
  this.where({ isActive: true })
});

export const AdminReportType = model('AdminReportType', adminReportTypeSchema);
