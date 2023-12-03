import { ValidateResult } from 'react-hook-form';
import * as yup from 'yup';

export const nameSchema = yup
  .string()
  .required('Please input your name')
  .matches(/^[A-ZА-Я]+\w*$/, 'Must contain first uppercase letter');
export const ageSchema = yup
  .number()
  .typeError('Please input your age')
  .moreThan(-1, 'Should be positive');
export const emailSchema = yup
  .string()
  .required('Please input your email')
  .email('Should match email pattern');
export const passwordSchema = yup
  .string()
  .required('Please input your password')
  .matches(/[A-ZА-Я]/, '1 uppercase letter')
  .matches(/[a-zа-я]/, '1 lowercase letter')
  .matches(/\d/, '1 digit')
  .matches(/\W/, '1 special symbol');
export const confirmPasswordSchema = (compareValue: string) => {
  return yup
    .string()
    .required('Please input password to confirm')
    .matches(new RegExp(compareValue || '^$'), 'Passwords not match');
};
export const genderSchema = yup.string().required('Please input your gender');
export const acceptTCSchema = yup.boolean().isTrue('You should accept T&C');
export const fileSchema = yup
  .mixed<FileList>()
  .test('required', 'please upload your image', (value) => {
    return value && !!value[0];
  })
  .test('fileSize', 'the file size is more than 2MB', (value) => {
    return value && value[0] && value[0].size <= 2000000;
  })
  .test('type', 'supports only jpeg png', (value) => {
    return (
      value &&
      value[0] &&
      new RegExp('^image/(?:jpeg|png)$').test(value[0].type)
    );
  });
export const countrySchema = yup.string().required('Please input your country');

export const validateCommon = async <T>(
  value: T,
  schema: yup.AnySchema,
  setter: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    await schema.validate(value);
    setter('');
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      setter(error.message);
      return false;
    }
  }
};

export const validatePassword = async (
  value: string,
  messageSetter: React.Dispatch<React.SetStateAction<string>>,
  strengthSetter: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    await passwordSchema.validate(value, { abortEarly: false });
    strengthSetter(4);
    messageSetter(``);
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const maxErrorsNumber = 5;
      const passwordStrength = 4;
      const errorsMessageList = error.inner.map((error) => error.message);
      if (errorsMessageList.length === maxErrorsNumber) {
        strengthSetter(0);
        messageSetter(
          `${
            errorsMessageList[0]
          } \n Password must contain at least:${errorsMessageList.slice(1)}`
        );
      } else {
        messageSetter(`Password must contain at least:${errorsMessageList}`);
        strengthSetter(passwordStrength - errorsMessageList.length);
      }
      return false;
    }
  }
};

export const getPasswordStrength = (validationRes: ValidateResult) => {
  switch (typeof validationRes) {
    case 'string':
      return 'type3';

    case 'object':
      return Array.isArray(validationRes)
        ? `type${4 - validationRes.length}`
        : '';

    default:
      if (!validationRes) {
        return 'type4';
      }
      return '';
  }
};
