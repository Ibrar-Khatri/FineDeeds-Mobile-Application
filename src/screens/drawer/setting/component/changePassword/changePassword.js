import {useFormik} from 'formik';
import {useToast} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  CustomButton,
  CustomToast,
  InputField,
  ResponsiveText,
} from '../../../../../components';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';
import {changeNewPassword} from '../../../../../shared/services/authServices';
import volunteerChangePasswordFormValidation from './validation';

export default function ChangePassword() {
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let toast = useToast();
  const formik = useFormik({
    initialValues: {oldPassword: '', newPassword: '', confirmPassword: ''},
    validationSchema: volunteerChangePasswordFormValidation,
    onSubmit: (values, {resetForm}) => {
      let {oldPassword, newPassword} = values;
      setIsLoading(true);
      changeNewPassword(oldPassword, newPassword)
        .then(res => {
          console.log(res, 'Password has been successfully Changed!');
          resetForm();
          setIsLoading(false);
          renderToast('success', 'Password has been successfully Changed!');
        })
        .catch(err => {
          renderToast('error', err);
          setIsLoading(false);
        });
    },
  });

  function renderToast(type, description) {
    toast.show({
      placement: 'top',
      duration: 3000,
      render: () => <CustomToast type={type} description={description} />,
    });
  }

  return (
    <View style={style.inputFieldsView}>
      <View>
        <ResponsiveText size={13} style={style.fieldTitle}>
          Current Password
        </ResponsiveText>
        <InputField
          type="password"
          value={formik.values.oldPassword}
          setValue={formik.handleChange('oldPassword')}
          secureTextEntry={true}
          invalidInput={showInvalidInput && formik.errors.oldPassword}
        />
      </View>
      <View>
        <ResponsiveText size={13} style={style.fieldTitle}>
          New Password
        </ResponsiveText>
        <InputField
          type="password"
          value={formik.values.newPassword}
          setValue={formik.handleChange('newPassword')}
          secureTextEntry={true}
          invalidInput={showInvalidInput && formik.errors.newPassword}
        />
      </View>
      <View>
        <ResponsiveText size={13} style={style.fieldTitle}>
          Confirm Password
        </ResponsiveText>
        <InputField
          type="password"
          value={formik.values.confirmPassword}
          setValue={formik.handleChange('confirmPassword')}
          secureTextEntry={true}
          invalidInput={showInvalidInput && formik.errors.confirmPassword}
        />
      </View>
      <CustomButton
        buttonText="UPDATE PASSWORD"
        onClick={() => {
          formik.handleSubmit();
          setShowInvalidInput(true);
        }}
        isLoading={isLoading}
      />
    </View>
  );
}

const style = StyleSheet.create({
  inputFieldsView: {
    width: '100%',
    padding: vw(3),
  },
  fieldTitle: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
  },
});
