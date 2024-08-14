
import { manageFileUpload } from '../helpers/file-upload-helper.js'
import { Paginator } from '../helpers/paginator-helper.js';
import { sendInviteEmail, sendResetPasswordToken } from '../helpers/user-helper.js';
import { User, Invitation } from '../models/UserModel//UserModel.js';
import { user_create_validation, user_login_validation, change_password_validation } from '../validations/user-validations.js'
import { Permission } from '../models/PermissionModel/PermissionModel.js';
import { Reporter } from '../models/ReportModel/ReporterModel.js';


export const createUser = async (req, res) => {
  const body = req.body
  const {
    fullName, email, phoneNumber, password, 
    department, role, responder, invitationalId
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
      fullName, email, phoneNumber, password, 
      department, role, responder
    });

    await user.save();

    if (invitationalId) {
      await Invitation.findOneAndDelete({ _id: invitationalId });
    }
    
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

    const user = await User.findOne({ email, suspended: false }).populate('department');
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

export const getOneUser = async (req, res) => {
  try {
    const { userId } = req.query
    const user = await User.findOne({ _id:  userId }).populate('department');
    const permissions = await Permission.find({}, 'action')
    res.status(200).json({
      status: "success",
      data: { user, permissions }
    });
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const suspendUser = async (req, res) => {
  try {
    const adminUser = req.user
    const { userId } = req.body;
    const commonUser = await User.findOne({ _id: userId })
    if (adminUser.role === 'superAdmin' || commonUser.department === adminUser.department) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { suspended: !commonUser.suspended }, //changing it herewith the bang sign !!
        {new: true}
      );
      return res.status(200).json({
        status: "success",
        message: !updatedUser.suspended ? 'User has been Un-suspended' : 'User has been Suspended Indefinitely'
      });
    } else {
      return res.status(401).json({
        status: "failed",
        message: 'No permissions to Suspended This User'
      });
    }
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const adminUser = req.user
    const { userId } = req.body;
    const commonUser = await User.findOne({ _id: userId })
    if (adminUser.role === 'superAdmin' || commonUser.department === adminUser.department) {
      await User.findOneAndUpdate(
        { _id: userId },
        { isActive: false },
      );
      return res.status(200).json({
        status: "success",
        message: 'User has been Deleted Temporarily'
      });
    } else {
      return res.status(401).json({
        status: "failed",
        message: 'No permissions to Delete This User'
      });
    }
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
    const { email, frontEnd } = req.body;
    let entity;
    if (frontEnd) {
      entity = await Reporter.findOne({ email });
    } else {
      entity = await User.findOne({ email });
    }
    if (entity) {
      await sendResetPasswordToken(entity, frontEnd);
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
    const { passwordToken, frontEnd } = req.body;
    let entity
    if (frontEnd) {
      entity = await Reporter.findOne({ passwordToken });
    } else {
      entity = await User.findOne({ passwordToken });
    }
   
    if (entity) {
      return res.status(200).json({
        status: "success",
        data: entity
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
  const { newPassword, email, frontEnd } = body;
  try {
    let entity
    if (frontEnd) {
      entity = await Reporter.findOne({ email });
    } else {
      entity = await User.findOne({ email });
    }
    
    if (!entity) {
      return res.status(401).json({  status: "failed", error: "invalid credentials"});
    }

    entity.password = newPassword;
    entity.passwordToken = null
    await entity.save();

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

export const inviteUser = async (req, res) => {
  const body = req.body
  const { department, email, agency } = body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({  
        status: "failed", message: "user already exists"
      });
    } else {
      const invite = new Invitation({
        email, department,
        agency: agency || null
      });
      await invite.save();

      await sendInviteEmail(email, invite._id)
      return res.status(200).json({
        status: "success",
        message: 'Invitational Email Sent successfully'
      });
    }
  } catch (error) {
    console.error('Error', error)
      return res.status(500).json({
        status: "error",
        message: error
    });
  }
}

export const getInvitation = async (req, res) => {
  try {
    const { invitationalId } = req.query
    const invitation = await Invitation.findOne({ _id:  invitationalId }).populate('department').populate('agency');
    res.status(200).json({
      status: "success",
      data: invitation
    });
  } catch (error) {
    console.log('Error ------', error)
    return res.status(500).json({
      status: "failed",
      error
    });
  }
}

export const addUserPermissions = async (req, res) => {
  try {
    const adminUser = req.user
    const { permissions, userId } = req.body;
    const commonUser = await User.findOne({ _id: userId })
    if (adminUser.role === 'superAdmin' || commonUser.department === adminUser.department) {
      await User.findOneAndUpdate(
        { _id: userId },
        { permissions },
      );
      
      return res.status(200).json({
        status: "success",
        message: 'Permissions Added successfully'
      });
    } else {
      return res.status(401).json({
        status: "failed", 
        error: "Error Adding Permissions for this User"
      });
    }
  } catch (error) {
    console.error('Error', error)
      return res.status(500).json({
        status: "error",
        message: error
    });
  }
}

export const addPermissions = async (req, res) => {
  try {
    const { action } = req.body
    const permission = new Permission({ action });
    await permission.save();
    if (permission) {
      return res.status(201).json({
        status: 'success',
      });
    } else {
      return res.status(401).json({
        status: "failed", 
        error: "Error Adding Permissions"
      });
    }
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
