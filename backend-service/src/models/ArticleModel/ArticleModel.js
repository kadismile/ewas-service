import { Schema, model } from 'mongoose';

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please Add Name of Agency']
  },
  description: {
    type: String,
    required: [true, 'Please Add Article Description']
  },

  user: {
    type: String,
    ref: 'User',
    required: [true, 'Please Add User']
  },
  
  attachments: [{
    type: Schema.Types.ObjectId,
    ref: 'Attachment'
  }],
  
  isActive : {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false });


export const Article = model('Article', articleSchema);