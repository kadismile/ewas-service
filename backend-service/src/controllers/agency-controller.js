
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

  if (req.method == 'PATCH') {
    const { _id } = req.body
    delete req.body._id
    const agency = await Agency.find({_id})
    if (agency) {
      await Agency.findByIdAndUpdate({ _id }, req.body);
      return res.status(200).json({
        status: 'success',
        message: 'Agency Updated'
      });
    }
  }

  if (req.method == 'DELETE') {
    const { _id } = req.body
    const agency = await Agency.find({_id})
    if (agency) {
      await Agency.deleteOne({_id})
      res.status(200).json({
        status: 'success',
        message: 'Agency Deleted'
      });
    } else {
      res.status(401).json({
        status: 'failed',
        message: 'Cannot Deleted Department '
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


/* {
  "_id":{"$oid":"65af876b8c29850614306573"},
  "email":"west@ewas.com",
  "fullName":"west",
  "password":"$2b$10$eQ.GQGCbzrjV2kAqkLGlnuhxmuRfI.Ic9OqjoOGIAEZbb.CVdZkxq",
  "department":"656b6560e8ac8c29ddb9ffd2",
  "phoneNumber":"07067525016",
  "role":"responder",
  "isActive":true,
  "suspended":false,
  "responder":"657036d7279c63715fbdea72",
  "permissions":["can-manage-reports","can-manage-responders"],
  "createdAt":{"$date":{"$numberLong":"1706002283621"}},
  "updatedAt":{"$date":{"$numberLong":"1706002519606"}}
} */
