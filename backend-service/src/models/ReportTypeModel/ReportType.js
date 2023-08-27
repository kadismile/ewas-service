import { Schema, model } from 'mongoose';

const reportTypeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please Add Full Name']
  },
  isActive : {
    type: Boolean,
    default: true
  }
},{versionKey: false});


reportTypeSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

reportTypeSchema.pre('find', async function() {
  this.where({ isActive: true })
});

export const ReportType = model('ReportType', reportTypeSchema);
