import { Schema, model } from 'mongoose';
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    required: [true, 'Please Add Email'],
  },
  fullName: {
    type: String,
    required: [true, 'Please Add Name']
  },
  password: {
    type: String,
    required: [true, 'Please Add password']
  },
  department: {
    type: Schema.Types.String,
    ref: 'Department',
    required: [true, 'Please Add department']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please Add Phone']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    required: [true, 'Please Add Phone'],
    default: 'user'
  },
  isActive : {
    type: Boolean,
    default: true
  }
},{ timestamps: true, versionKey: false });


userSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

userSchema.pre('find', async function() {
  this.where({ isActive: true })
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    }
  }
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getSignedJwtToken = function(expires) {
  const JWT_SECRET = process.env.JWT_SECRET
  return jwt.sign({ email: this.email, role: this.role }, JWT_SECRET, {
    expiresIn: expires ? expires : process.env.JWT_EXPIRE
  });
};

export const User = model('User', userSchema);