import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './homeScreen/homeScreeen';
import DrawerContent from '../../components/compo/drawerContent/drawerContent';
import style from './drawerStyle';
import ProfileScreen from './profileScreen/profileScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation({navigation}) {
  return (
    <Drawer.Navigator
      screenOptions={{
        title: 'Finedeeds',
        headerTitleStyle: style.headerTitleStyle,
        headerStyle: style.headerStyle,
        headerRight: () => (
          <Image
            source={require('../../assets/images/fineDeedLogo.png')}
            style={style.finededLogo}
          />
        ),
        drawerType: 'front',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="landing-screen"
        component={HomeScreen}
        options={{drawerLabel: 'Home'}}
      />
      <Drawer.Screen
        name="profile-screen"
        component={ProfileScreen}
        options={{drawerLabel: 'Profile'}}
      />
    </Drawer.Navigator>
  );
}
