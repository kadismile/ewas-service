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
    required: [true, 'Please Add Email'],
  },
  phoneNumbers: {
    type: [String],
    required: [true, 'Please Add Name']
  },
  isActive : {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false });


agencySchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

agencySchema.pre('find', async function() {
  this.where({ isActive: true })
});

export const Agency = model('Agency', agencySchema);