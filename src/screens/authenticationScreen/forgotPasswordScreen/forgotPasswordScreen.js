import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {useToast} from 'native-base';
import {forgotPasswordValidationSchema} from '../../../shared/validation/authValidation';
import {
  InputFieldsHeader,
  InputField,
  CustomButton,
  NavigationLink,
  CustomToast,
  AuthWrapper,
} from '../../../components/index';
import {forgotPassword} from '../../../shared/services/authServices';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function ForgotPasswordScreen({navigation}) {
  let [isLoading, setIsLoading] = useState(false);
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: values => {
      const {email} = values;
      setIsLoading(true);
      forgotPassword(email)
        .then(res => {
          setIsLoading(false);
          navigation.navigate('reset-password', {email});
        })
        .catch(err => {
          setIsLoading(false);
          toast.show({
            placement: 'top',
            duration: 2000,
            render: () => (
              <CustomToast type="error" description={err.message} />
            ),
          });
        });
    },
  });

  return (
    <AuthWrapper>
      <InputFieldsHeader
        title="Forgot Password"
        subTitle="Please check your email for password reset code"
        loading={isLoading}
      />
      <View style={style.inputFieldsView}>
        <InputField
          type="email"
          value={formik.values.email}
          setValue={formik.handleChange('email')}
          placeholder="Email Address"
          invalidInput={showInvalidInput && formik.errors.email}
          autoCapitalize="none"
        />
        <CustomButton
          buttonText="SEND CODE"
          onClick={formik.handleSubmit}
          setShowInvalidInput={setShowInvalidInput}
          isLoading={isLoading}
        />
        <NavigationLink
          text="Go Back"
          displayName="Login"
          navigation={navigation}
          routeName="login"
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
