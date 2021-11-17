import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import {useToast} from 'native-base';
import style from './signupScreenStyle';
import {signupValidationSchema} from '../../../shared/validation/authValidation';
import CustomButton from '../../../components/common/button/button';
import CustomToast from '../../../components/common/customToast/customToast';
import InputField from '../../../components/common/inputField/inputField';
import InputFieldsHeader from '../../../components/common/inputFieldsHeader/inputFieldsHeader';
import NavigationLink from '../../../components/common/navigationLink/navigationLink';
import InvalidInput from '../../../components/common/invalidInput/invalidInput';
import {signup} from '../../../shared/services/authServices';
import CustomCheckBox from '../../../components/common/customCheckBox/customCheckBox';

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
    onSubmit: userDet => {
      if (acceptTermsAndCond) {
        setIsLoading(true);
        signup(userDet)
          .then(res => {
            setIsLoading(false);
            let user = {
              name: userDet.name,
              email: res.user.username,
              userConfirmed: res.userConfirmed,
              userSub: res.userSub,
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
    <View style={style.mianView}>
      <ScrollView>
        <InputFieldsHeader
          title="Volunteer Sign up"
          subTitle="Start helping someone today and engage with people who care as much as you do."
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
                setIsChecked={setAcceptTermsAndCond}
              />
              <NavigationLink
                text="I Accept The Finedeeds"
                displayName="Terms Of Service"
                navigation={navigation}
                screenName="static-screen"
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
      </ScrollView>
    </View>
  );
}
