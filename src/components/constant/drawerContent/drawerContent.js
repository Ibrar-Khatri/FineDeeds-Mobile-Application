import React, {useEffect, useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {BackHandler, Image, Text, View} from 'react-native';
import {useDrawerStatus} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderS3Image from '../../common/renderS3Image/renderS3Image';
import ResponsiveText from '../../common/responsiveText/responsiveText';
import {logout} from '../../../shared/services/authServices';
import {DrawerActions} from '@react-navigation/native';
import style from './drawerContentStyle';

export default function DrawerContent(props) {
  let {isUserAuthenticated, setIsUserAuthenticated, volunteer} = props;
  let [index, setIndex] = useState(0);
  let [update, setUpdate] = useState(false);

  const isDrawerOpen = useDrawerStatus() === 'open';
  useEffect(() => {
    setUpdate(isDrawerOpen);
  }, [isDrawerOpen]);

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (index === 0) {
      BackHandler.exitApp();
    }
    setIndex(0);
    props.navigation.navigate('landing-screen');
    return true;
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
      nestedScreenName: 'login',
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
      nestedScreenName: 'signup',
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
      nestedScreenName: 'about',
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
      nestedScreenName: 'howItWorks',
      alwaysShown: true,
    },
    {
      lable: 'Request A Demo',
      // isFocused: false,
      screenName: '',
      nestedScreenName: '',
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
      item.screenName && item.nestedScreenName
        ? props.navigation.navigate(item.screenName, {
            screen: item.nestedScreenName,
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
          <RenderS3Image
            resizeMode="cover"
            style={style.profileImageStyle}
            s3Key={
              volunteer?.volunteerId &&
              `VOLUNTEER/${volunteer?.volunteerId}.webp`
            }
            update={update}
          />
          <ResponsiveText style={style.nameText} size={13}>
            {volunteer?.volunteerName}
          </ResponsiveText>
          <ResponsiveText style={style.roleText} size={11}>
            {volunteer?.__typename}
          </ResponsiveText>
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
