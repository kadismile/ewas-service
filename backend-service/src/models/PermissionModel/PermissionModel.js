import { Schema, model } from 'mongoose';

const permissionSchema = new Schema({
  action: {
    type: String,
    required: true,
  },
},
{ timestamps: true, versionKey: false });


export const Permission = model('Permission', permissionSchema);