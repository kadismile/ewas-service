import { Schema, model } from 'mongoose';
import  bcrypt from 'bcrypt';

const complainerSchema = new Schema({
  email: {
    type: String,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    required: [true, 'Please Add Email'],
  },
  fullName: {
    type: String,
    required: [true, 'Please Add Name of Agency']
  },
  password: {
    type: String,
    required: [true, 'Please Add password']
  },
  address: {
    type: String,
    required: [true, 'Please Add Address']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please Add Phone']
  },
  isActive : {
    type: Boolean,
    default: true
  }
},
{timestamps: true, versionKey: false }
);


complainerSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

complainerSchema.pre('find', async function() {
  this.where({ isActive: true })
});

complainerSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    }
  }
  next();
});

export const Complainer = model('Complainer', complainerSchema);