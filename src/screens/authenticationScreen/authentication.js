import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './loginScreen/loginScreen';
import SignupScreen from './signupScreen/signupScreen';
import ForgotPasswordScreen from './forgotPasswordScreen/forgotPasswordScreen';
import ConfirmationEmail from './emailConfirmation/emailConfirmation';
import ResetPassword from './resetPassword/resetPassword';

const Stack = createNativeStackNavigator();

export default function AuthenticationScreen({route}) {
  let {initialRouteName} = route.params;

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="forgot-password" component={ForgotPasswordScreen} />
      <Stack.Screen name="email-confirmation" component={ConfirmationEmail} />
      <Stack.Screen name="reset-password" component={ResetPassword} />
    </Stack.Navigator>
  );
}
