
import { Complainer } from '../models/ComplainerModel/ComplainerModel.js';
import { create_complainer_validation } from '../validations/complianer-validations.js'

export const createComplainer = async (req, res) => {
  try {
  const body = req.body
  const { error } = create_complainer_validation.validate(body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  let { fullName, phoneNumber, email, password, address, } = req.body;
  let complainer = await findComplainerByEmailOrPhone(phoneNumber, email);


  if (complainer) {
    return res.status(401).json({
      status: 'failed',
      mesage: `complainer already exist with ${phoneNumber} or ${email}`,
    })
  }

  complainer = new Complainer({
    email, fullName, phoneNumber, password,address,
  });

  await complainer.save();
  delete complainer._doc.password;

  if (complainer) {
    return res.status(201).json({
      status: 'success',
      data: complainer
    });
  }
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e
    });
  }
}

const findComplainerByEmailOrPhone = async (phoneNumber, email) => {
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
