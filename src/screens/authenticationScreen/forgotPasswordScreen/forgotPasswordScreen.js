import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import {forgotPasswordValidationSchema} from '../../../services/validation/authentication/authValidation';
import style from './forgotPasswordScreenStyle';
import InputFieldsHeader from '../../../components/commonComponents/inputFieldsHeader/inputFieldsHeader';
import InputField from '../../../components/commonComponents/inputField/inputField';
import CustomButton from '../../../components/commonComponents/button/button';
import NavigationLink from '../../../components/commonComponents/navigationLink/navigationLink';
import {forgotPassword} from '../../../services/sharedFunctions/authentication';
import {useToast} from 'native-base';
import CustomToast from '../../../components/commonComponents/customToast/customToast';

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
    <View style={style.mianView}>
      <ScrollView>
        <InputFieldsHeader
          title="Forgot Password"
          subTitle="Please check your email for password reset code"
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
      </ScrollView>
    </View>
  );
}
