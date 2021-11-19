import React, {useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {BackHandler, Image, Text, View} from 'react-native';
import {logout} from '../../../shared/services/authServices';
import {DrawerActions} from '@react-navigation/native';
import style from './drawerContentStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawerContent(props) {
  let {isUserAuthenticated, setIsUserAuthenticated, user} = props;
  let [index, setIndex] = useState(0);

  BackHandler.addEventListener('hardwareBackPress', () => {
    setIndex(0);
  });

  let arry = [
    {
      lable: 'Home',
      isFocused: false,
      screenName: 'landing-screen',
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
      screenName: '',
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
      isUserAuthenticated: false,
    },

    {
      lable: 'Profile',
      isFocused: false,
      screenName: 'profile-screen',
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
      // isFocused: false,
      screenName: '',
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
    if (arry[ind].screenName) {
      setIndex(ind);
    }

    if (item.lable === 'Logout') {
      logout()
        .then(res => {
          setIsUserAuthenticated(false);
          setIndex(0);
          AsyncStorage.removeItem('volunteer');
          props.navigation.dispatch(DrawerActions.closeDrawer());
          props.navigation.dispatch(DrawerActions.jumpTo('landing-screen'));
        })
        .catch(err => {
          setIsUserAuthenticated(true);
        });
    } else {
      item.screenName && item.initialRouteName
        ? props.navigation.navigate(item.screenName, {
            initialRouteName: item.initialRouteName,
          })
        : item.screenName && props.navigation.navigate(item.screenName);
    }
  }

  if (arry[index].screenName) {
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
