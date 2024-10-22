import { Schema, model } from 'mongoose';

const reportTypeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please Add Name of report']
  },
  isActive : {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false });


reportTypeSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

reportTypeSchema.pre('find', async function() {
  this.where({ isActive: true })
});

export const ReportType = model('ReportType', reportTypeSchema);
