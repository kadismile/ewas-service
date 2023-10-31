import { Schema, model } from 'mongoose';
import { reportsAfterSave } from '../ReportModel/reports_after-save.js';


const generateRandomLetters = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
};

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
},
{timestamps: true, versionKey: false }
);


const reportSchema = new Schema({
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
  intervention: {
    // if intevention is True Agency should be provided
    type: Boolean,
    default: false
  },
  agencyId: {
    ref: 'Agency',
    type: Schema.Types.ObjectId
  },
  reoccurence: {
    type: Boolean,
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
  numberKilled: {
    type: String,
    default: 0,
  },
  numberInjured: {
    type: String,
    default: 0,
  },
  numberDisplaced: {
    type: String,
    default: 0,
  },
  userId: {
    type: String,
    ref: 'User',
  },
  mediaLinks: {
    type: String,
  },
  attachments: [{
    type: Schema.Types.ObjectId,
    ref: 'Attachment'
  }],
  verified: {
    type: String,
    default: 'not-verified',
    enum:['not-verified','processing', 'verified', 'returned', 'false-report']
  },
  reportSlug: {
    type: String,
    unique: true,
    required: true,
    default: () => generateRandomLetters() + Math.floor(100 + Math.random() * 900)
  },
  verificationMethod: {
    type: String,
  },
  responder: {
    type: Schema.Types.ObjectId,
    ref: 'Agency'
  },
  isActive : {
    type: Boolean,
    default: true
  }
},
{timestamps: true, versionKey: false }
);

reportSchema.pre('findOne', async function() {
  this.where({ isActive: true })
});

reportSchema.pre('find', async function() {
  this.where({ isActive: true })
});

reportSchema.post('save', async function (doc) {
  doc.isNew
  await reportsAfterSave(doc)
  console.log(`Notification sent to user ${doc.title}`);
});

export const Report = model('Report', reportSchema);
