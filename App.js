import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/loginScreen/loginScreen';
import SignupScreen from './src/screens/signupScreen/signupScreen';
import ForgotPasswordScreen from './src/screens/forgotPasswordScreen/forgotPasswordScreen';
import { NativeBaseProvider } from 'native-base';
import StaticScreens from './src/screens/staticScreen/staticScreen';


const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='login' component={LoginScreen} />
          <Stack.Screen name='signup' component={SignupScreen} />
          <Stack.Screen name='forgot-password' component={ForgotPasswordScreen} />
          <Stack.Screen name='static-screen' component={StaticScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
