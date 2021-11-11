import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import style from './resetPasswordStyle';
import {resetPasswordValidationSchema} from '../../../services/validation/authentication/authValidation';
import CustomButton from '../../../components/commonComponents/button/button';
import InputField from '../../../components/commonComponents/inputField/inputField';
import InputFieldsHeader from '../../../components/commonComponents/inputFieldsHeader/inputFieldsHeader';
import {confirmNewPassword} from '../../../services/sharedFunctions/authentication';
import {useToast} from 'native-base';
import CustomToast from '../../../components/commonComponents/customToast/customToast';

export default function ResetPassword({navigation, route}) {
  let {email} = route.params;

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
    <View style={style.mianView}>
      <ScrollView>
        <InputFieldsHeader
          title="Reset Password"
          subTitle="Please check your email for password reset code"
        />
        <View style={style.inputFieldsView}>
          <InputField
            type="text"
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
      </ScrollView>
    </View>
  );
}
