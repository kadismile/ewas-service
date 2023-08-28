import { Schema, model } from 'mongoose';

const agencySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please Add Name of Agency']
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