
import { Report } from '../models/ReportModel/ReporterModel.js';
import { create_reporter_validation } from '../validations/reporter-validations.js'
import { ReportType } from '../models/ReportTypeModel/ReportTypeModel.js';
import { agency_validation } from '../validations/crud-validations.js'

export const createReporter = async (req, res) => {
  try {
  const body = req.body
  const { error } = create_reporter_validation.validate(body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  let { fullName, phoneNumber, email, password, address, } = req.body;
  let reporter = await findReporterByEmailOrPhone(phoneNumber, email);


  if (reporter) {
    return res.status(401).json({
      status: 'failed',
      mesage: `complainer already exist with ${phoneNumber} or ${email}`,
    })
  }

  reporter = new Report({
    email, fullName, phoneNumber, password,address,
  });

  await reporter.save();
  delete reporter._doc.password;

  if (reporter) {
    return res.status(201).json({
      status: 'success',
      data: reporter
    });
  }
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}



export const reportType = async (req, res) => {
  const body = req.body
  if (req.method == 'GET') {
    const reportType = await ReportType.find({})
    return res.status(200).json({
      status: 'success',
      data: reportType
    });
  }
  const { error } = agency_validation.validate(body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const reportType = new ReportType(body);
    await reportType.save();
    if (reportType) {
      return res.status(201).json({
        status: 'success',
        data: reportType
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}


const findReporterByEmailOrPhone = async (phoneNumber, email) => {
  const account = await Complainer.findOne({
    $or: [
      { email },
      { phoneNumber }],
  }).select('+password');
  if (!account) {
    return null;
  }
  return account;
};
