import libPhone from 'google-libphonenumber';
const { PhoneNumberUtil } = libPhone;

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
