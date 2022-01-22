import React from 'react';
import * as Yup from 'yup';

const volunteerBasicInformationValidation = Yup.object().shape({
  volunteerName: Yup.string()
    .max(50, 'Text should be less than 50 characters.')
    .required('This field is required.'),
  gender: Yup.string().required('This field is required').nullable(),

  city: Yup.string().required('This field is required').nullable(),

  country: Yup.string().required('This field is required').nullable(),

  aboutMe: Yup.string()
    .required('This field is required')
    .min(30, 'Text should contain atleast 30 characters.')
    .max(500, 'Text should be less than 500 characters')
    .nullable(),
});

export default volunteerBasicInformationValidation;
