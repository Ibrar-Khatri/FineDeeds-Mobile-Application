import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import {loginValidationSchema} from '../../../services/validation/authentication/authValidation';
import style from './loginScreenStyle';
import InputFieldsHeader from '../../../components/commonComponents/inputFieldsHeader/inputFieldsHeader';
import InputField from '../../../components/commonComponents/inputField/inputField';
import CustomButton from '../../../components/commonComponents/button/button';
import NavigationLink from '../../../components/commonComponents/navigationLink/navigationLink';
import {login} from '../../../services/sharedFunctions/authentication';
import CustomToast from '../../../components/commonComponents/customToast/customToast';
import {useToast} from 'native-base';

export default function LoginScreen({navigation}) {
  let [isLoading, setIsLoading] = useState(false);
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: values => {
      const {email, password} = values;
      setIsLoading(true);
      login(email, password)
        .then(res => {
          setIsLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'drawer'}],
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
    },
  });

  return (
    <View style={style.mianView}>
      <ScrollView>
        <InputFieldsHeader title="Login" subTitle="Be the change" />
        <View style={style.inputFieldsView}>
          <InputField
            type="email"
            value={formik.values.email}
            setValue={formik.handleChange('email')}
            placeholder="Email"
            invalidInput={showInvalidInput && formik.errors.email}
            autoCapitalize="none"
          />
          <InputField
            type="password"
            value={formik.values.password}
            setValue={formik.handleChange('password')}
            secureTextEntry={true}
            placeholder="Password"
            invalidInput={showInvalidInput && formik.errors.password}
          />
          <NavigationLink
            displayName="Forgot Password?"
            navigation={navigation}
            routeName="forgot-password"
          />
          <CustomButton
            buttonText="LOG IN"
            onClick={formik.handleSubmit}
            setShowInvalidInput={setShowInvalidInput}
            isLoading={isLoading}
          />
          <NavigationLink
            text="Don't have an account?"
            displayName="Click Here"
            navigation={navigation}
            routeName="signup"
          />
        </View>
      </ScrollView>
    </View>
  );
}
