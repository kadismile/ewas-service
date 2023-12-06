import { Schema, model } from 'mongoose';

const agencySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please Add Name of Agency']
  },
  email: {
    type: String,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
  },
  
  phoneNumber: {
    type: String,
    required: [true, 'Please Add Phone number']
  },
  isActive : {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false });


export const Agency = model('Agency', agencySchema);