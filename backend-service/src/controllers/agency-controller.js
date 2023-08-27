
import { Agency } from '../models/AgencyModel/AgencyModel.js';
import { agency_validation } from '../validations/crud-validations.js'

export const agencyResource = async (req, res) => {
  const body = req.body
  try {

  if (req.method == 'GET') {
    const agency = await Agency.find({})
    return res.status(200).json({
      status: 'success',
      data: agency
    });
  }

  if (req.method == 'POST') {
    const { error } = agency_validation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const agency = new Agency(body);
    await agency.save();
    if (agency) {
      return res.status(201).json({
        status: 'success',
        data: agency
      });
    }
  }

  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}
