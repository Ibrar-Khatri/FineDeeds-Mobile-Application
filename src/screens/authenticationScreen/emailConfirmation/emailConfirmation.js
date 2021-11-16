import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import {emailConfirmationValidationSchema} from '../../../services/validation/authentication/authValidation';
import style from './emailConfirmationStyle';
import InputFieldsHeader from '../../../components/commonComponents/inputFieldsHeader/inputFieldsHeader';
import InputField from '../../../components/commonComponents/inputField/inputField';
import CustomButton from '../../../components/commonComponents/button/button';
import {
  confirm,
  resendSignUp,
} from '../../../services/sharedFunctions/authentication';
import {useToast} from 'native-base';
import CustomToast from '../../../components/commonComponents/customToast/customToast';

export default function ConfirmationEmail({navigation, route}) {
  const {user} = route.params;
  let [isLoading, setIsLoading] = useState(false);
  let [codeResend, setCodeResend] = useState(false);
  let toast = useToast();

  const formik = useFormik({
    initialValues: {
      confirmationCode: '',
    },
    validationSchema: emailConfirmationValidationSchema,
    onSubmit: values => {
      setIsLoading(true);
      const {confirmationCode} = values;
      confirm(user.email, confirmationCode)
        .then(res => {
          setIsLoading(false);
          navigation.navigate('login');
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

  function resenCode() {
    if (!codeResend) {
      setCodeResend(true);
      resendSignUp(user.email)
        .then(res => {
          setCodeResend(false);
          toast.show({
            placement: 'top',
            duration: 2000,
            render: () => (
              <CustomToast
                type="success"
                description="Welcome back! We sent you a new confirmation code."
              />
            ),
          });
        })
        .catch(err => {
          toast.show({
            placement: 'top',
            duration: 2000,
            render: () => (
              <CustomToast type="error" description={err.message} />
            ),
          });
          setCodeResend(false);
        });
    }
  }

  let [showInvalidInput, setShowInvalidInput] = useState(false);
  return (
    <View style={style.mianView}>
      <ScrollView>
        <InputFieldsHeader title="Confirmation Email" subTitle="Join us now" />
        <View style={style.inputFieldsView}>
          <InputField
            type="number"
            value={formik.values.confirmationCode}
            setValue={formik.handleChange('confirmationCode')}
            placeholder="Enter Code"
            invalidInput={showInvalidInput && formik.errors.confirmationCode}
            autoCapitalize="none"
            keyboardType="numeric"
          />
          <CustomButton
            buttonText="Confirm"
            onClick={formik.handleSubmit}
            setShowInvalidInput={setShowInvalidInput}
            isLoading={isLoading}
          />
          <View style={style.textView}>
            <Text style={style.text1}>Didn't Recieve Code?</Text>
            <Text style={style.text2} onPress={resenCode}>
              {codeResend ? '...Loading' : 'Resend Code'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}