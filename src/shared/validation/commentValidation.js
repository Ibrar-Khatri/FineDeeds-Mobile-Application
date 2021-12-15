import * as yup from 'yup';

export const commentValidation = yup.object().shape({
  comment: yup.string().trim().required('*required'),
});
