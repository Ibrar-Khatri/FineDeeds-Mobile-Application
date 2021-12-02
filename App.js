import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import Amplify from 'aws-amplify';
import awsConfig from './aws_credentials/awsConfig';
import DrawerNavigation from './src/screens/drawer/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthenticationScreen from './src/screens/authenticationScreen/authentication';
import {ApolloProvider} from '@apollo/client';
import {FinedeedsAppClient} from './aws_credentials/graphql-client.js';
import {LogBox} from 'react-native';

Amplify.configure({...awsConfig});

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'new NativeEventEmitter',
]);

const App = () => {
  return (
    <ApolloProvider client={FinedeedsAppClient}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="drawer" component={DrawerNavigation} />
            <Stack.Screen
              name="authentication-screen"
              component={AuthenticationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  );
};

export default App;
