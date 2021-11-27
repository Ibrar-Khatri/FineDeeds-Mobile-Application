import * as yup from 'yup';

export const volunteerAddExperienceValidation = yup.object().shape({
  jobTitle: yup.string().trim().required('This field is required'),
  orgName: yup.string().trim().required('This field is required'),
  fromDate: yup.string().required('This field is required'),
  isCurrent: yup.bool(),

  endDate: yup.string().when('isCurrent', {
    is: false,
    then: yup.string().required('This field is required'),
    otherwise: yup.string(),
  }),
  description: yup.string().trim(),
});
