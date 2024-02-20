
import { Schema, model } from 'mongoose';
import { smsReportsAfterSave } from '../ReportModel/sms_report_after-save.js';

const smsReportSchema = new Schema({
  message: {
    type: String,
  },
  ref: {
    type: String,
  },
  sender: {
    type: String
  },

  date: {
    type: String
  },
  
  isActive : {
    type: Boolean,
    default: true
  }
},
{timestamps: true, versionKey: false }
);

/* smsReportSchema.post('save', async function (doc) {
  doc.isNew
  await smsReportsAfterSave(doc)
  console.log(`SMS report Notification sent to user ${doc.reportSlug}`);
}); */


smsReportSchema.index({
  sender: 'text',
});


export const SMSReport = model('SMSReport', smsReportSchema);
