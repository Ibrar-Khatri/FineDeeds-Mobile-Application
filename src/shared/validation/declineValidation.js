import * as yup from 'yup';

const requestDeclineFormValidation = yup.object().shape({
  note: yup
    .string()
    .max(500, 'Text should be less than 500 characters.')
    .required('This field is required'),
});

export {requestDeclineFormValidation};
