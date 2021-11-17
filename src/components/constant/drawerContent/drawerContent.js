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
import {useRoute} from '@react-navigation/native';

export default function DrawerContent(props) {
  let [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  let [user, setUser] = useState();
  let [index, setIndex] = useState(0);
  let navigation = useNavigation();

  useEffect(() => {
    isLoggedIn()
      .then(res => {
        setIsUserAuthenticated(true);
        setUser(res.attributes);
      })
      .catch(err => {
        setIsUserAuthenticated(false);
      });
    console.log(props);
  }, [isUserAuthenticated]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    setIndex(0);
    navigation.dispatch(DrawerActions.closeDrawer());
  });

  let arry = [
    {
      lable: 'Home',
      isFocused: false,
      screenName: 'landing-screen',
      initialRouteName: 'about',
      alwaysShown: true,
    },
    {
      lable: 'Login',
      isFocused: false,
      screenName: 'authentication-screen',
      initialRouteName: 'login',
      isUserAuthenticated: false,
    },
    {
      lable: 'Nonprofit login',
      isFocused: false,
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
      isFocused: false,
      screenName: '',
      initialRouteName: '',
      isUserAuthenticated: false,
    },
    {
      lable: 'Profile',
      isFocused: false,
      screenName: 'profile-screen',
      initialRouteName: 'about',
      isUserAuthenticated: true,
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
      isFocused: false,
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
      isFocused: false,
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
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate('landing-screen');
          setIsUserAuthenticated(false);
        })
        .catch(err => {
          setIsUserAuthenticated(true);
        });
    } else {
      item.screenName && item.initialRouteName
        ? navigation.navigate(item.screenName, {
            initialRouteName: item.initialRouteName,
          })
        : item.screenName && navigation.navigate(item.screenName);
    }
  }

  arry[index].isFocused = arry[index].isFocused ? false : true;

  return (
    <DrawerContentScrollView {...props}>
      {isUserAuthenticated && (
        <View style={style.profileView}>
          <Image source={require('../../../assets/images/fineDeedLogo.png')} />
          <Text style={style.nameText}>{user?.name}</Text>
          <Text style={style.roleText}>Volunteer</Text>
        </View>
      )}
      {/* {isUserAuthenticated && <DrawerItemList {...props} />} */}
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
      {/* {isUserAuthenticated && (
        <DrawerItem
          label="Logout"
          drawerActiveTintColor={style.drawerActiveTintColor}
          drawerActiveBackgroundColor={style.drawerActiveBackgroundColor}
          drawerInactiveTintColor={style.drawerInactiveTintColor}
          drawerInActiveBackgroundColor={style.drawerInActiveBackgroundColor}
          labelStyle={style.drawerLabelStyle}
          onPress={() => darwerItemPress('logout')}
        />
      )} */}
    </DrawerContentScrollView>
  );
}
