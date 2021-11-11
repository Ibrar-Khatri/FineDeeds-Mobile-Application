import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image, Text, View} from 'react-native';
import {
  isLoggedIn,
  logout,
} from '../../../services/sharedFunctions/authentication';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/native';
import style from './drawerContentStyle';

export default function DrawerContent(props) {
  let [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  let [user, setUser] = useState();
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
  }, [isUserAuthenticated]);

  function darwerItemPress(item) {
    if (item === 'logout') {
      logout()
        .then(res => {
          navigation.dispatch(DrawerActions.closeDrawer());
          setIsUserAuthenticated(false);
        })
        .catch(err => {
          setIsUserAuthenticated(true);
        });
    } else if (!item.isUserAuthenticated) {
      navigation.navigate(item.screenName, {
        initialRouteName: item.initialRouteName,
      });
    }
  }

  let arry = [
    {
      lable: 'Login',
      screenName: 'authentication-screen',
      initialRouteName: 'login',
      isUserAuthenticated: false,
    },
    {
      lable: 'Nonprofit login',
      screenName: 'authentication-screen',
      initialRouteName: 'login',
      isUserAuthenticated: false,
    },
    {
      lable: 'Become a volunteer',
      screenName: 'authentication-screen',
      initialRouteName: 'signup',
      isUserAuthenticated: false,
    },
    {
      lable: 'Register a non-profit',
      screenName: 'authentication-screen',
      initialRouteName: 'signup',
      isUserAuthenticated: false,
    },
    {
      lable: 'About',
      screenName: 'drawer',
      initialRouteName: '',
      isUserAuthenticated: true,
    },
    {
      lable: 'Stories',
      screenName: 'drawer',
      initialRouteName: '',
      isUserAuthenticated: true,
    },
    {
      lable: 'How It Works',
      screenName: '',
      initialRouteName: '',
      alwaysShown: true,
    },
    {
      lable: 'Request A Demo',
      screenName: '',
      initialRouteName: '',
      isUserAuthenticated: false,
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      {isUserAuthenticated && (
        <View style={style.profileView}>
          <Image source={require('../../../assets/images/fineDeedLogo.png')} />
          <Text style={style.nameText}>{user?.name}</Text>
          <Text style={style.roleText}>Volunteer</Text>
        </View>
      )}

      {isUserAuthenticated && <DrawerItemList {...props} />}
      {arry.map(
        (item, i) =>
          (item.alwaysShown ||
            item.isUserAuthenticated === isUserAuthenticated) && (
            <DrawerItem
              key={i}
              label={item.lable}
              drawerActiveTintColor={style.drawerActiveTintColor}
              drawerActiveBackgroundColor={style.drawerActiveBackgroundColor}
              drawerInactiveTintColor={style.drawerInactiveTintColor}
              drawerInActiveBackgroundColor={
                style.drawerInActiveBackgroundColor
              }
              labelStyle={style.drawerLabelStyle}
              onPress={() => darwerItemPress(item)}
            />
          ),
      )}
      {isUserAuthenticated && (
        <DrawerItem
          label="Logout"
          drawerActiveTintColor={style.drawerActiveTintColor}
          drawerActiveBackgroundColor={style.drawerActiveBackgroundColor}
          drawerInactiveTintColor={style.drawerInactiveTintColor}
          drawerInActiveBackgroundColor={style.drawerInActiveBackgroundColor}
          labelStyle={style.drawerLabelStyle}
          onPress={() => darwerItemPress('logout')}
        />
      )}
    </DrawerContentScrollView>
  );
}
