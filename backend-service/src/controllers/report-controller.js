
import { ReportType } from '../models/ReportTypeModel/ReportTypeModel.js';
import { agency_validation } from '../validations/crud-validations.js'

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
