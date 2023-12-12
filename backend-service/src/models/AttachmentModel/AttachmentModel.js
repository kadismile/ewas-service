import { Schema, model } from 'mongoose';

const attachmentSchema = new Schema({
  asset_id: {
    type: String,
  },
  public_id: {
    type: String,
  },
  signature: {
    type: String,
  },
  format: {
    type: String,
  },
  url: {
    type: String,
  },
  secure_url: {
    type: String,
  },
  report: {
    type: String,
    ref: 'Report'
  },
  article: {
    type: String,
    ref: 'Aricle'
  },
  model: {
    type: String,
  },
  isActive : {
    type: Boolean,
    default: true
  }
},
{ timestamps: true, versionKey: false });


attachmentSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

attachmentSchema.pre('find', async function() {
  this.where({ isActive: true })
});

export const Attachment = model('Attachment', attachmentSchema);