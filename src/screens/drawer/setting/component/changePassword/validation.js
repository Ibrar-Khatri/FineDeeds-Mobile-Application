import React from 'react';
import * as Yup from 'yup';
import {FormattedMessage} from 'react-intl';

const volunteerChangePasswordFormValidation = Yup.object().shape({
  oldPassword: Yup.string()
    .label('Old Password')
    .required('This field is required')
    .min(8, 'Password should be greater than 8 characters')
    .max(300, 'Old Password should be less than 300 characters.')
    .nullable(),
  newPassword: Yup.string()
    .label('New Password')
    .required('This field is required')
    .min(8, 'New Password should be greater than 8 characters.')
    .max(300, 'New Password should be less than 300 characters.')
    .nullable(),
  confirmPassword: Yup.string()
    .label('Confirm Password')
    .required('This field is required')
    .min(8, 'Confirm Password should be greater than 8 characters.')
    .max(300, 'Confirm Password should be less than 300 characters.')
    .test('match', "New and confirm password don't match", function (value) {
      return this.parent.newPassword === value;
    })
    .nullable(),
});

export default volunteerChangePasswordFormValidation;
