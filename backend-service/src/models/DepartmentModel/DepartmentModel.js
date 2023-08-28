import { Schema, model } from 'mongoose';

const departmentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please Add Name of Department']
  },
  acronym: {
    type: String,
    required: [true, 'Please Add Acronym of Department']
  },
  isActive : {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false });


departmentSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

departmentSchema.pre('find', async function() {
  this.where({ isActive: true })
});

export const Department = model('Department', departmentSchema);