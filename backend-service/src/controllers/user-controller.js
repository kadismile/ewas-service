
import { User } from '../models/UserModel//UserModel.js';
import { user_create_validation, user_login_validation } from '../validations/user-validations.js'

export const createUser = async (req, res) => {
  const body = req.body
  const { 
    fullName, email, phoneNumber, password, departmentId
  } = body
  try {
    const { error } = user_create_validation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let user = await findUserByEmailOrPhone(phoneNumber, email);
    if (user) {
      // send a mail here welcoming the new User
      return res.status(301).json({
        status: 'failed',
        message: `User already exists with ${email} and ${phoneNumber}`
      });
    }

    user = new User({
      fullName, email, phoneNumber, password, departmentId
    });

    await user.save();
    if (user) {
      return res.status(201).json({
        status: 'success',
        data: user
      });
    }
  
    } catch (e) {
      console.log('Error', e)
      return res.status(500).json({
        status: "error",
        message: e
      });
  }
};

export const loginUser = async (req, res) => {
  const body = req.body
  const { email, password } = body;

  try {
    const { error } = user_login_validation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ error: "invalid credentials"});
    }
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({ error: "invalid credentials"});
    } else {
      const token = user.getSignedJwtToken();
      delete user._doc.password;
      delete user._doc.role;

      res.status(200).json({
        status: "success",
        token,
        user
      });

    }
  } catch (e) {
      console.log('Error', e)
      return res.status(500).json({
        status: "error",
        message: e
    });
  }

  const account = await Account.findOne({ email });

  if (!account) {
    return req.respond.badRequest();
  }

  if (!await account.validateHash(account.password, password)) {
    return req.respond.badRequest();
  }

  // eslint-disable-next-line no-underscore-dangle
  delete account._doc.password;
  delete account._doc.isAdmin;
  delete account._doc.role;

  const stake = await Stake.findOne({ account: account._id });

  if (!stake) return req.respond.internalError();

  return req.respond.ok({
    authorization: stake.getJwtHash(),
    user: account,
  });
};

const findUserByEmailOrPhone = async (phoneNumber, email) => {
  const user = await User.findOne({
    $or: [
      { email },
      { phoneNumber }],
  }).select('+password');
  if (!user) {
    return null;
  }
  return user;
};
