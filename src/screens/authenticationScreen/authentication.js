import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet} from 'react-native';
import LoginScreen from './loginScreen/loginScreen';
import SignupScreen from './signupScreen/signupScreen';
import ForgotPasswordScreen from './forgotPasswordScreen/forgotPasswordScreen';
import ConfirmationEmail from './emailConfirmation/emailConfirmation';
import ResetPassword from './resetPassword/resetPassword';
import TermsAndCondition from './termsAndCondition/termsAndCondition';

const Stack = createNativeStackNavigator();

export default function AuthenticationScreen({route}) {
  const {initialRouteName} = route.params;

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="forgot-password" component={ForgotPasswordScreen} />
      <Stack.Screen name="email-confirmation" component={ConfirmationEmail} />
      <Stack.Screen name="reset-password" component={ResetPassword} />
      <Stack.Screen
        name="terms-and-condition"
        component={TermsAndCondition}
        options={() => ({
          headerTitle: 'Terms and Conditions',
          headerTitleStyle: style.headerTitleStyle,
          headerShown: true,
          headerRight: () => (
            <Image
              source={require('../../assets/images/fineDeedLogo.png')}
              style={style.headerRightIcon}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

let style = StyleSheet.create({
  headerTitleStyle: {
    color: 'black',
    fontFamily: 'Merriweather-Bold',
  },
  headerRightIcon: {
    height: 30,
    width: 35,
  },
});
