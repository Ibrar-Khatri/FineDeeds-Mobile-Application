import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import {useToast} from 'native-base';
import {loginValidationSchema} from '../../../shared/validation/authValidation';
import style from './loginScreenStyle';
import InputFieldsHeader from '../../../components/common/inputFieldsHeader/inputFieldsHeader';
import InputField from '../../../components/common/inputField/inputField';
import CustomButton from '../../../components/common/button/button';
import NavigationLink from '../../../components/common/navigationLink/navigationLink';
import {login} from '../../../shared/services/authServices';
import CustomToast from '../../../components/common/customToast/customToast';
import {getVolunteerById} from '../../../../graphql/queries';
import {useLazyQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  let [isLoading, setIsLoading] = useState(false);
  let [showInvalidInput, setShowInvalidInput] = useState(false);
  let [getVolunteer, volunteerData] = useLazyQuery(getVolunteerById);
  let toast = useToast();

  useEffect(() => {
    console.log(volunteerData?.variables)
    if (volunteerData?.variables) {
      AsyncStorage.setItem(
        'volunteer',
        JSON.stringify(volunteerData?.data?.getVolunteerById),
      )
        .then(res => {
          setIsLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'drawer'}],
          });
        })
        .catch(err => {
          setIsLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'drawer'}],
          });
        });
    }
  }, [volunteerData?.data?.getVolunteerById]);

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
