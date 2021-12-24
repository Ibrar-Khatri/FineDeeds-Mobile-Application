import React, {useEffect, useState} from 'react';
import {BackHandler, View, Dimensions, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDrawerStatus} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerActions} from '@react-navigation/native';
import {RenderS3Image, ResponsiveText} from '../../common/common';
import {logout} from '../../../shared/services/authServices';
import {
  heightPercentageToDP as vh,
  normalize,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

const screenWidth = Dimensions.get('window').width;

export default function DrawerContent(props) {
  const {
    isUserAuthenticated,
    setIsUserAuthenticated,
    volunteer,
    state,
    ...rest
  } = props;
  let [index, setIndex] = useState(0);
  let [update, setUpdate] = useState(false);
  // const newState = {...state};
  // newState.routes = newState.routes.filter(
  //   item => item.name !== 'detail-screen',
  // );

  const isDrawerOpen = useDrawerStatus() === 'open';
  useEffect(() => {
    setUpdate(isDrawerOpen);
  }, [isDrawerOpen]);

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   if (index === 0) {
  //     BackHandler.exitApp();
  //   }
  //   setIndex(0);
  //   props.navigation.navigate('landing-screen');
  //   return true;
  // });

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
      screenName: 'listAll-screen',
      isUserAuthenticated: true,
      headerTitle: 'Stories',
      initialRouteName: 'story_list',
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
    // if (arry[ind].screenName) {
    //   setIndex(ind);
    // }

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
        : item.screenName &&
          props.navigation.navigate(item.screenName, {
            initialRouteName: item.initialRouteName,
            title: item.headerTitle,
          });
    }
  }

  // if (arry[index].screenName) {
  //   arry[index].isFocused = arry[index].isFocused ? false : true;
  // }

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
              // focused={item.isFocused}
              labelStyle={style.drawerLabelStyle}
              onPress={() => darwerItemPress(item, i)}
              pressColor={style.pressColor}
            />
          ),
      )}
    </DrawerContentScrollView>
  );
}

let style = StyleSheet.create({
  drawerLabelStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(screenWidth > 480 && 11),
  },
  activeTintColor: '#f06d06',
  inactiveTintColor: '#212529',
  activeBackgroundColor: '#fff',
  pressColor: '#f06d06',
  nameText: {
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    fontSize: vw(4),
    margin: 5,
  },
  roleText: {
    color: '#212529',
    fontWeight: '300',
    fontSize: vw(3.5),
    fontFamily: 'Montserrat-Regular',
  },
  profileView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
    padding: 20,
  },
  profileImageStyle: {
    height: vh(10),
    width: vh(10),
    borderRadius: 100,
    overflow: 'hidden',
  },
});
