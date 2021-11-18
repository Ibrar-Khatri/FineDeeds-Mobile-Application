import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {BackHandler, Image, Text, View} from 'react-native';
import {isLoggedIn, logout} from '../../../shared/services/authServices';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/native';
import style from './drawerContentStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawerContent(props) {
  let {isUserAuthenticated, setIsUserAuthenticated, user} = props;
  let [index, setIndex] = useState();
  let navigation = useNavigation();

  BackHandler.addEventListener('hardwareBackPress', () => {
    setIndex();
    navigation.dispatch(DrawerActions.closeDrawer());
  });

  let arry = [
    {
      lable: 'Login',
      isFocused: false,
      screenName: 'authentication-screen',
      initialRouteName: 'login',
      isUserAuthenticated: false,
    },
    {
      lable: 'Nonprofit login',
      // isFocused: false,
      screenName: '',
      initialRouteName: '',
      isUserAuthenticated: false,
    },
    {
      lable: 'Become a volunteer',
      isFocused: false,
      screenName: 'authentication-screen',
      initialRouteName: 'signup',
      isUserAuthenticated: false,
    },
    {
      lable: 'Register a non-profit',
      // isFocused: false,
      screenName: '',
      initialRouteName: '',
      isUserAuthenticated: false,
    },
    {
      lable: 'About',
      isFocused: false,
      screenName: 'static-screen',
      initialRouteName: 'about',
      isUserAuthenticated: true,
    },
    {
      lable: 'Stories',
      // isFocused: false,
      screenName: '',
      initialRouteName: '',
      isUserAuthenticated: true,
    },
    {
      lable: 'How It Works',
      isFocused: false,
      screenName: 'static-screen',
      initialRouteName: 'howItWorks',
      alwaysShown: true,
    },
    {
      lable: 'Request A Demo',
      // isFocused: false,
      screenName: '',
      initialRouteName: '',
      isUserAuthenticated: false,
    },
    {
      lable: 'Logout',
      isFocused: false,
      isUserAuthenticated: true,
    },
  ];
  function darwerItemPress(item, ind) {
    setIndex(ind);
    if (item.lable === 'Logout') {
      logout()
        .then(res => {
          setIsUserAuthenticated(false);
          console.log('setIsUserAuthenticated(false);');
          AsyncStorage.removeItem('volunteer');
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.dispatch(DrawerActions.jumpTo('landing-screen'));
        })
        .catch(err => {
          setIsUserAuthenticated(true);
        });
    } else {
      item.screenName &&
        item.initialRouteName &&
        navigation.navigate(item.screenName, {
          initialRouteName: item.initialRouteName,
        });
    }
  }

  if (index && arry[index].screenName) {
    arry[index].isFocused = arry[index].isFocused ? false : true;
  }

  return (
    <DrawerContentScrollView {...props}>
      {isUserAuthenticated && (
        <View style={style.profileView}>
          <Image source={require('../../../assets/images/fineDeedLogo.png')} />
          <Text style={style.nameText}>{user?.name}</Text>
          <Text style={style.roleText}>Volunteer</Text>
        </View>
      )}
      <DrawerItemList {...props} />
      {arry.map(
        (item, i) =>
          (item.alwaysShown ||
            item.isUserAuthenticated === isUserAuthenticated) && (
            <DrawerItem
              key={i}
              label={item.lable}
              activeTintColor={style.activeTintColor}
              inactiveTintColor={style.inactiveTintColor}
              activeBackgroundColor={style.activeBackgroundColor}
              focused={item.isFocused}
              labelStyle={style.drawerLabelStyle}
              onPress={() => darwerItemPress(item, i)}
              pressColor={style.pressColor}
            />
          ),
      )}
    </DrawerContentScrollView>
  );
}
