import { Schema, model } from 'mongoose';
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const addressSchema = new Schema({
  country: {
    type: String,
    required: [true, 'country is missing']
  },
  fullAddress: {
    type: String,
    required: [true, 'full address is missing']
  },
  countryCode: {
    type: String,
    required: [true, 'country code is missing']
  },
  localGovt: {
    type: String,
    required: [true, 'Local Government is missing']
  },
  state: {
    type: String,
    required: [true, 'state is missing']
  },
},
{timestamps: true, versionKey: false }
);


const reporterSchema = new Schema({
  email: {
    type: String,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    required: [true, 'Please Add Email'],
  },
  fullName: {
    type: String,
    required: [true, 'Please Add Full name']
  },
  password: {
    type: String,
    required: [true, 'Please Add password']
  },
  passwordToken: {
    type: Number,
  },
  address: {
    type: addressSchema,
    required: [true, 'Please Add Address']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
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


reporterSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

reporterSchema.pre('find', async function() {
  this.where({ isActive: true })
});

reporterSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    }
  }
  next();
});

reporterSchema.methods.getSignedJwtToken = function(expires) {
  const JWT_SECRET = process.env.JWT_SECRET
  return jwt.sign({ email: this.email }, JWT_SECRET, {
    expiresIn: expires ? expires : process.env.JWT_EXPIRE
  });
};

reporterSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export const Reporter = model('Reporter', reporterSchema);