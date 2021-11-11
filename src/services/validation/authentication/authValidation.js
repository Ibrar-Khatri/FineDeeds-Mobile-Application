import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password should be greater than ${min} characters`)
    .required('Password is required'),
});

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password should be greater than ${min} characters`)
    .required('Password is required'),
});

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
});

export const emailConfirmationValidationSchema = yup.object().shape({
  confirmationCode: yup.number().required('This field is required'),
});
export const resetPasswordValidationSchema = yup.object().shape({
  confirmationCode: yup.number().required('Confirmation code is required'),
  newPassword: yup
    .string()
    .min(8, ({min}) => `Password should be greater than ${min} characters`)
    .required('New Password is required'),
  confrimPassword: yup
    .string()
    .min(8, ({min}) => `Password should be greater than ${min} characters`)
    .required('Confirm Password is required')
    .oneOf(
      [yup.ref('newPassword'), null],
      "New and confrim password don't match",
    ),
});
