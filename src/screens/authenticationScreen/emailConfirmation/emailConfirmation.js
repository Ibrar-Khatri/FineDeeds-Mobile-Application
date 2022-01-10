import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {useToast} from 'native-base';
import {emailConfirmationValidationSchema} from '../../../shared/validation/authValidation';
import {
  InputFieldsHeader,
  InputField,
  CustomButton,
  CustomToast,
  AuthWrapper,
} from '../../../components/index';
import {confirm, resendSignUp} from '../../../shared/services/authServices';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function ConfirmationEmail({navigation, route}) {
  const {user} = route.params;
  let [isLoading, setIsLoading] = useState(false);
  let [codeResend, setCodeResend] = useState(false);
  let [showInvalidInput, setShowInvalidInput] = useState(false);
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
  return (
    <AuthWrapper>
      <InputFieldsHeader
        title="Confirmation Email"
        subTitle="Join us now"
        loading={isLoading}
      />
      <View style={style.inputFieldsView}>
        <InputField
          type="number"
          keyboardType="numeric"
          value={formik.values.confirmationCode}
          setValue={formik.handleChange('confirmationCode')}
          placeholder="Enter Code"
          invalidInput={showInvalidInput && formik.errors.confirmationCode}
          autoCapitalize="none"
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
    </AuthWrapper>
  );
}

let style = StyleSheet.create({
  inputFieldsView: {
    marginTop: 30,
    marginLeft: vw(7),
    marginRight: vw(7),
  },
  textView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  text1: {
    color: 'black',
    fontWeight: '300',
  },
  text2: {
    color: '#f06d06',
    fontSize: vw(4),
    fontWeight: '300',
    paddingLeft: 5,
  },
});
