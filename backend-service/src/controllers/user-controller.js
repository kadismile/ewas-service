
import { manageFileUpload } from '../helpers/file-upload-helper.js'
import { Paginator } from '../helpers/paginator-helper.js';
import { sendResetPasswordToken } from '../helpers/user-helper.js';
import { User } from '../models/UserModel//UserModel.js';
import { user_create_validation, user_login_validation, change_password_validation } from '../validations/user-validations.js'


export const createUser = async (req, res) => {
  const body = req.body
  const { 
    fullName, email, phoneNumber, password, department, role
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
      fullName, email, phoneNumber, password, department, role
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
      return res.status(401).json(
        { 
          status: "failed",
          message: "invalid credentials"
        });
    }
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({ 
        status: "failed",
        message: "invalid credentials"
      });
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
};

export const changePassword = async (req, res) => {
  const body = req.body
  const { oldPassword, newPassword } = body;

  try {
    const { error } = change_password_validation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(401).json({  status: "failed", error: "invalid credentials"});
    }
    
    if (!await user.matchPassword(oldPassword)) {
      return res.status(401).json({ status: "failed", error: "Invalid old password provided"});
    }
  
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: 'password changed successfully'
    });
  } catch (error) {
    console.error('Error', error)
      return res.status(500).json({
        status: "error",
        message: error
    });
  }
}

export const authorizeUser = async (req, res) => {
  try {
    const user = req.user
    if (user) {
      return res.status(200).json({
        status: "success",
        user
      });
    } else {
      return res.status(200).json({
        status: "failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const getUsers = async (req, res) => {
  try {
    const populate = [
      ['department'],
    ]
    const users = await Paginator({...req.query}, User, populate);
    res.status(200).json({
      status: "success",
      data: users
    });
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const sendResetPassEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      await sendResetPasswordToken(user);
      return res.status(200).json({
        status: "success",
        message: 'A password reset link as been sent to your email'
      });
    } else {
      return res.status(300).json({
        status: "failed",
        message: 'No Email Found'
      });
    }
  } catch (error) {
    console.log("Error ", error)
  }
};

export const verifyPassToken = async (req, res) => {
  try {
    const { passwordToken } = req.body;
    const user = await User.findOne({ passwordToken });
    if (user) {
      return res.status(200).json({
        status: "success",
        data: user
      });
    } else {
      return res.status(404).json({
        status: "failed",
        message: 'No User Found'
      });
    }
  } catch (error) {
    console.log("Error ", error)
  }
};

export const resetPassword = async (req, res) => {
  const body = req.body
  const { newPassword, email } = body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({  status: "failed", error: "invalid credentials"});
    }

    user.password = newPassword;
    user.passwordToken = null
    await user.save();

    return res.status(200).json({
      status: "success",
      message: 'password changed successfully'
    });
  } catch (error) {
    console.error('Error', error)
      return res.status(500).json({
        status: "error",
        message: error
    });
  }
}

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
