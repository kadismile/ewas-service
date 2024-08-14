import libPhone from 'google-libphonenumber';
import { User } from '../models/UserModel/UserModel.js';
const { PhoneNumberUtil } = libPhone;
import { MailHelper } from '../helpers/mail-helper.js';
import { Reporter } from '../models/ReportModel/ReporterModel.js';

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

export const sendResetPasswordToken = async (user, frontEnd) => {
  const passwordToken = Math.floor(100000 + Math.random() * 9000000000000) 
  if (frontEnd) {
    await Reporter.findOneAndUpdate({ email: user.email}, {
      passwordToken
    })
  } else {
    await User.findOneAndUpdate({email: user.email}, {
      passwordToken
    })
  }
  
  const baseUrl = frontEnd ? process.env.FRONTEND_URL : process.env.DASHBOARD_URL;
  const resetPasswordUrl = `${baseUrl}reset-password/${passwordToken}`
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

export const sendReportsToAgenciesEmail = async (agencies, reportSlug) => {
  const reportUrl = `${process.env.DASHBOARD_URL}report/${reportSlug}`
  agencies.forEach( async (agency) => {
    const data = {
      email: agency.email,
      subject: 'Please Respond to Report',
      reportUrl,
      year: new Date().getFullYear(),
    }
    const type = 'agency-report';
    await MailHelper.sendMail(type, 'agency-report-email', data);
  });
  return true;
};

export const sendReportsToDepartmentEmail = async (departmentID, reportSlug) => {
  const reportUrl = `${process.env.DASHBOARD_URL}report/${reportSlug}`
  const users = await User.find({ department: departmentID })
  users.forEach( async (user) => {
    const data = {
      email: user.email,
      subject: 'Please Respond to Report',
      reportUrl,
      year: new Date().getFullYear(),
    }
    const type = 'agency-report';
    await MailHelper.sendMail(type, 'agency-report-email', data);
  });
  return true;
};