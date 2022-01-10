import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import {useToast} from 'native-base';
import {loginValidationSchema} from '../../../shared/validation/authValidation';
import {
  InputFieldsHeader,
  InputField,
  CustomButton,
  NavigationLink,
  CustomToast,
  AuthWrapper,
} from '../../../components/index';
import {login} from '../../../shared/services/authServices';
import {getVolunteerById} from '../../../../graphql/queries';
import {useLazyQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function LoginScreen({navigation}) {
  let [isLoading, setIsLoading] = useState(false);
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);
  let toast = useToast();

  useEffect(() => {
    if (volunteerData?.data?.getVolunteerById) {
      AsyncStorage.setItem(
        'volunteer',
        JSON.stringify(volunteerData?.data?.getVolunteerById),
      ).then(() => {
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'drawer'}],
        });
      });
    }
  }, [volunteerData]);

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
          getVolunteer({
            variables: {volunteerId: res.attributes.sub},
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
    <AuthWrapper>
      <InputFieldsHeader
        title="Login"
        subTitle="Be the change"
        loading={isLoading}
      />
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
