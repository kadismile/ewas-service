// @ts-nocheck
import { Schema, model } from 'mongoose';

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
  longitude: {
    type: Number,
    required: [true, 'longitude missing']
  },
  latitude: {
    type: String,
    required: [true, 'latitude missing']
  },
  localGovt: {
    type: String,
    required: [true, 'Local Government is missing']
  },
  state: {
    type: String,
    required: [true, 'state is missing']
  },
  userTypedAddress: {
    type: String,
    required: [true, 'user typed address is missing']
  },
},
{timestamps: true, versionKey: false }
);


const draftReportSchema = new Schema({
  reportTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'ReportType'
  },
  addminReportType: {
    type: String,
    ref: 'AdminReportType'
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  reporterId: {
    type: String,
    ref: 'Reporter',
    required: [true, 'Please Add Reporter ID']
  },
  title: {
    type: String,
    required: [true, 'Add titleof report']
  },
  description: {
    type: String,
    required: [true, 'Add titleof report']
  },
  dateOfIncidence: {
    type: Date
  },
  timeOfIncidence: {
    type: Date
  },
  intervention: {
    type: String,
    default: false
  },
  agencyId: {
    ref: 'Agency',
    type: Schema.Types.ObjectId
  },
  reoccurence: {
    type: String,
  },
  resolved: {
    type: String,
  },
  status: {
    type: String,
    default: 'processing',
    enum:['processing', 'processed', 'pending']
  },
  address: {
    type: addressSchema,
    required: [true, 'Please Add Address']
  },

  userId: {
    type: String,
    ref: 'User',
  },
  mediaLinks: {
    type: String,
  },
  informationSource: {
    type: String,
  },
  attachments: [{
    type: Schema.Types.ObjectId,
    ref: 'Attachment'
  }],
  
  reportSlug: {
    type: String,
    unique: true,
    required: true,
  },
  
  responder: {
    type: Schema.Types.ObjectId,
    ref: 'Agency'
  },

  reportId: {
    type: String,
    required: true,
  },
  
},
{timestamps: true, versionKey: false }
);


export const DraftReport = model('DraftReport', draftReportSchema);
