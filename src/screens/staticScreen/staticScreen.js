import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Image, View, Text} from 'react-native';
import style from './staticScreenStyle';
import TermsAndCondition from './termsAndCondition/termsAndCondition';
import About from './about/about';
import HowItWorks from './howItWorks/howItWorks';

const Stack = createNativeStackNavigator();

export default function StaticScreens({route}) {
  let {initialRouteName} = route.params;

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
      {initialRouteName === 'about' && (
        <Stack.Screen
          name="about"
          component={About}
          options={() => ({
            headerTitle: 'About',
            headerTitleStyle: style.headerTitleStyle,
            headerStyle: style.headerStyle,
            headerRight: () => (
              <Image
                source={require('../../assets/images/fineDeedLogo.png')}
                style={style.headerRightIcon}
              />
            ),
          })}
        />
      )}
      {initialRouteName === 'howItWorks' && (
        <Stack.Screen
          name="howItWorks"
          component={HowItWorks}
          options={() => ({
            headerTitle: 'How it Works',
            headerTitleStyle: style.headerTitleStyle,
            headerStyle: style.headerStyle,
            headerRight: () => (
              <Image
                source={require('../../assets/images/fineDeedLogo.png')}
                style={style.headerRightIcon}
              />
            ),
          })}
        />
      )}
    </Stack.Navigator>
  );
}
