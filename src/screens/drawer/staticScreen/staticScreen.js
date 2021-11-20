import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import About from './about/about';
import HowItWorks from './howItWorks/howItWorks';

const Stack = createNativeStackNavigator();

export default function StaticScreens({route}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="howItWorks" component={HowItWorks} />
    </Stack.Navigator>
  );
}
