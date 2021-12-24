import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {useToast} from 'native-base';
import {signupValidationSchema} from '../../../shared/validation/authValidation';
import {
  CustomButton,
  CustomToast,
  InputField,
  InputFieldsHeader,
  NavigationLink,
  InvalidInput,
  CustomCheckBox,
  AuthWrapper,
} from '../../../components/common/common';
import {signup} from '../../../shared/services/authServices';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function SignupScreen({navigation}) {
  let [acceptTermsAndCond, setAcceptTermsAndCond] = useState(false);
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: user => {
      let userDet = {
        ...user,
        'custom:role': 'VOLUNTEER',
      };
      if (acceptTermsAndCond) {
        setIsLoading(true);
        signup(userDet)
          .then(res => {
            setIsLoading(false);
            let user = {
              userConfirmed: res.userConfirmed,
              userSub: res.userSub,
              ...userDet,
            };
            navigation.navigate('email-confirmation', {
              user,
            });
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
      }
    },
  });

  return (
    <AuthWrapper>
      <InputFieldsHeader
        title="Volunteer Sign up"
        subTitle="Start helping someone today and engage with people who care as much as you do."
        loading={isLoading}
      />
      <View style={style.inputFieldsView}>
        <InputField
          type="text"
          value={formik.values.name}
          setValue={formik.handleChange('name')}
          placeholder="Full Name"
          invalidInput={showInvalidInput && formik.errors.name}
        />
        <InputField
          type="email"
          value={formik.values.email}
          setValue={formik.handleChange('email')}
          placeholder="Email Address"
          autoCapitalize="none"
          invalidInput={showInvalidInput && formik.errors.email}
        />
        <InputField
          type="password"
          value={formik.values.password}
          setValue={formik.handleChange('password')}
          secureTextEntry={true}
          placeholder="Password"
          invalidInput={showInvalidInput && formik.errors.password}
        />
        <View style={style.termsAndCondView}>
          <View style={style.checkBoxAndTextView}>
            <CustomCheckBox
              isChecked={acceptTermsAndCond}
              callOnPress={() => setAcceptTermsAndCond(!acceptTermsAndCond)}
            />
            <NavigationLink
              text="I Accept The Finedeeds"
              displayName="Terms Of Service"
              navigation={navigation}
              routeName="terms-and-condition"
            />
          </View>
          {showInvalidInput && !acceptTermsAndCond && (
            <InvalidInput error="Accept Term Of Service is required" />
          )}
        </View>
        <CustomButton
          buttonText="SIGNUP"
          onClick={formik.handleSubmit}
          setShowInvalidInput={setShowInvalidInput}
          isLoading={isLoading}
        />
        <NavigationLink
          text="Already have an account?"
          displayName="Click Here"
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
  termsAndCondView: {
    marginBottom: 15,
  },
  checkBoxAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
