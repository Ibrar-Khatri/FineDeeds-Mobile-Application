import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {useToast} from 'native-base';
import {resetPasswordValidationSchema} from '../../../shared/validation/authValidation';
import {
  CustomButton,
  InputField,
  InputFieldsHeader,
  CustomToast,
  AuthWrapper,
} from '../../../components/index';
import {confirmNewPassword} from '../../../shared/services/authServices';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function ResetPassword({navigation, route}) {
  const {email} = route.params;

  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let toast = useToast();

  const formik = useFormik({
    initialValues: {
      confirmationCode: '',
      newPassword: '',
      confrimPassword: '',
    },
    validationSchema: resetPasswordValidationSchema,

    onSubmit: userDet => {
      let {confirmationCode, newPassword} = userDet;
      setIsLoading(true);
      confirmNewPassword(email, confirmationCode, newPassword)
        .then(res => {
          setIsLoading(false);
          navigation.navigate('login');
        })
        .catch(err => {
          setIsLoading(false);
          toast.show({
            placement: 'top',
            duration: 2000,
            render: () => <CustomToast type="error" description={err} />,
          });
        });
    },
  });

  return (
    <AuthWrapper>
      <InputFieldsHeader
        title="Reset Password"
        subTitle="Please check your email for password reset code"
        loading={isLoading}
      />
      <View style={style.inputFieldsView}>
        <InputField
          type="number"
          keyboardType="numeric"
          value={formik.values.confirmationCode}
          setValue={formik.handleChange('confirmationCode')}
          placeholder="Confirmation Code"
          invalidInput={showInvalidInput && formik.errors.confirmationCode}
        />
        <InputField
          type="password"
          value={formik.values.newPassword}
          setValue={formik.handleChange('newPassword')}
          secureTextEntry={true}
          placeholder="New Password"
          invalidInput={showInvalidInput && formik.errors.newPassword}
        />
        <InputField
          type="password"
          value={formik.values.confrimPassword}
          setValue={formik.handleChange('confrimPassword')}
          secureTextEntry={true}
          placeholder="Confirm Password"
          invalidInput={showInvalidInput && formik.errors.confrimPassword}
        />
        <CustomButton
          buttonText="Confirm"
          onClick={formik.handleSubmit}
          setShowInvalidInput={setShowInvalidInput}
          isLoading={isLoading}
        />
      </View>
    </AuthWrapper>
  );
}

let style = StyleSheet.create({
  inputFieldsView: {
    marginTop: 30,
    marginLeft: vw(7),
    marginRight: vw(7),
  },
});
