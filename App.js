import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import DrawerNavigation from './src/screens/drawer/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthenticationScreen from './src/screens/authenticationScreen/authentication';
import StaticScreens from './src/screens/staticScreen/staticScreen';

Amplify.configure(config);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="drawer" component={DrawerNavigation} />
          <Stack.Screen
            name="authentication-screen"
            component={AuthenticationScreen}
          />
          <Stack.Screen name="static-screen" component={StaticScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
