import React from 'react';
import * as Yup from 'yup';

const volunteerBasicInformationValidation = Yup.object().shape({
  volunteerName: Yup.string()
    .max(50, 'Username should be less than 50 characters.')
    .required('Username is required.'),
  gender: Yup.string().required('Gender is required.').nullable(),

  city: Yup.string().required('City is required.').nullable(),

  country: Yup.string().required('Country is required.').nullable(),

  aboutMe: Yup.string()
    .required('Country is required.')
    .min(30, 'Text should contain atleast 30 characters.')
    .max(500, 'Text should be less than 500 characters')
    .nullable(),
});

export default volunteerBasicInformationValidation;
