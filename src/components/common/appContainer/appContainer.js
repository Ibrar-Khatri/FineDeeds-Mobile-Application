import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from '../../../screens/drawer/drawer';
import AuthenticationScreen from '../../../screens/authenticationScreen/authentication';
import DetailScreen from '../../../screens/detailScreens/detailScreens';
import ListAllScreen from '../../../screens/listAllScreen/listAllScreen';

const Stack = createNativeStackNavigator();

export default function AppContainer() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="drawer" component={DrawerNavigation} />
          <Stack.Screen
            name="authentication-screen"
            component={AuthenticationScreen}
          />
          <Stack.Screen name="detail-screen" component={DetailScreen} />
          <Stack.Screen name="listAll-screen" component={ListAllScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
