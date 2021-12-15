import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './homeScreen/homeScreeen';
import DrawerContent from '../../components/constant/drawerContent/drawerContent';
import ProfileScreen from './profileScreen/profileScreen';
import style from './drawerStyle';
import {isLoggedIn} from '../../shared/services/authServices';
import StaticScreens from './staticScreen/staticScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import About from './staticScreen/about/about';
import HowItWorks from './staticScreen/howItWorks/howItWorks';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation({navigation}) {
  let [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  let [volunteer, setVolunteer] = useState();
  useEffect(() => {
    isLoggedIn()
      .then(res => {
        setIsUserAuthenticated(true);
        AsyncStorage.getItem('volunteer').then(vol => {
          setVolunteer(JSON.parse(vol));
        });
      })
      .catch(err => {
        setIsUserAuthenticated(false);
      });
  }, [isUserAuthenticated]);
  return (
    <Drawer.Navigator
      screenOptions={{
        title: 'Finedeeds',
        headerTintColor: style.headerTintColor,
        headerTitleStyle: style.headerTitleStyle,
        headerStyle: style.headerStyle,
        headerRight: () => (
          <Image
            source={require('../../assets/images/fineDeedLogo.png')}
            style={style.finededLogo}
            resizeMode="contain"
          />
        ),
        drawerType: 'front',
        drawerActiveTintColor: '#f06d06',
        drawerInactiveTintColor: '#212529',
        drawerActiveBackgroundColor: '#fff',
      }}
      backBehavior="order"
      drawerContent={props => (
        <DrawerContent
          {...props}
          isUserAuthenticated={isUserAuthenticated}
          setIsUserAuthenticated={setIsUserAuthenticated}
          volunteer={volunteer}
        />
      )}>
      <Drawer.Screen
        screenProp
        name="landing-screen"
        options={{
          drawerLabel: 'Home',
        }}>
        {() => <HomeScreen isUserAuthenticated={isUserAuthenticated} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="profile-screen"
        component={ProfileScreen}
        options={{drawerLabel: 'Profile', unmountOnBlur: true}}
      />
      <Drawer.Screen name="static-screen" component={StaticScreens} />
    </Drawer.Navigator>
  );
}
