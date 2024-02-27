// @ts-nocheck
import { Schema, model } from 'mongoose';
import { reportsAfterSave } from '../ReportModel/reports_after-save.js';
import { ReportType } from '../ReportTypeModel/ReportTypeModel.js'
import { REPORT_TYPE } from '../../lib/constants.js'



const generateRandomLetters = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return 'REPORT-' + Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
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
  community: {
    type: String,
  },
  userTypedAddress: {
    type: String,
    required: [true, 'user typed address is missing']
  },
},
{timestamps: true, versionKey: false }
);

const actionableSchema = new Schema({
  currentUser: {
    type: String,
    ref: 'User',
    required: [true, 'current user is missing']
  },
  currentDepartment: {
    type: String,
    ref: 'Department',
    required: [true, 'current department is missing']
  },
  reportUserHistory: [{
    type: String,
  }],
  nextActionableDept: {
    type: String,
  },
  agencyId: {
    type: String,
  }
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
    enum:['resolved', 'unresolved', 'processing']
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
  nums_women_affected: {
    type: String,
    default: 0,
  },
  nums_children_affected: {
    type: String,
    default: 0,
  },
  nums_cattle_affected: {
    type: String,
    default: 0,
  },
  nums_properties_affected: {
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
  informationSource: {
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
  responderVeriMethod: {
    type: String,
  },
  responder: {
    type: Schema.Types.ObjectId,
    ref: 'Agency'
  },
  actionableUsers: {
    type: actionableSchema,
  },
  isActive : {
    type: Boolean,
    default: true
  },
  smsReport : {
    type: Boolean,
    default: false
  },
  smsReportId : {
    type: String,
  },
  
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
  console.log(`Notification sent to user ${doc.reportSlug}`);
});

reportSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('reportSlug')) {
    if (this.reportSlug) {
      const reportType = await ReportType.findOne({ _id: this.reportTypeId});
      const foundSlug = REPORT_TYPE.find((slug) => Object.keys(slug)[0] === reportType.name)
      this.reportSlug = "REPORT-" + Object.values(foundSlug)[0] + '-' + new Date().getTime();
    }
  }
  next();
});

reportSchema.index({
  reportSlug: 'text',
});


export const Report = model('Report', reportSchema);
