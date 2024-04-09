import libPhone from 'google-libphonenumber';
import { User } from '../models/UserModel/UserModel.js';
const { PhoneNumberUtil } = libPhone;
import { MailHelper } from '../helpers/mail-helper.js';

export const validatePhoneNumber = (phoneNumber) => {
  try {
    const parsedNumber = PhoneNumberUtil.parseAndKeepRawInput(phoneNumber, 'NG');
    const isValid = PhoneNumberUtil.isValidNumber(parsedNumber);
    const formattedNumber = PhoneNumberUtil.format(parsedNumber, PhoneNumberUtil.NATIONAL);

    return { isValid, formattedNumber };
  } catch (error) {
    throw new Error('Invalid phone number');
  }
};

export const sendResetPasswordToken = async (user) => {
  const passwordToken = Math.floor(100000 + Math.random() * 9000000000000) 
  await User.findOneAndUpdate({email: user.email}, {
    passwordToken
  })
  const resetPasswordUrl = `${process.env.DASHBOARD_URL}reset-password/${passwordToken}`
  const type = 'forgotPasswordToken';
  const data = {
    email: user.email,
    subject: 'Reset Your Password',
    resetPasswordUrl,
    name: user.fullName,
    year: new Date().getFullYear(),
  }
  await MailHelper.sendMail(type, 'forgot-password-token', data);
  return true;
};

export const sendInviteEmail = async (email, invite) => {
  const invitationUrl = `${process.env.DASHBOARD_URL}invited-user/${invite}`
  const type = 'user-invitation';
  const data = {
    email,
    subject: 'You have been Invited',
    invitationUrl,
    year: new Date().getFullYear(),
  }
  await MailHelper.sendMail(type, 'user-invitational-email', data);
  return true;
};
