import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Platform, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './homeScreen/homeScreeen';
import DrawerContent from '../../components/constant/drawerContent/drawerContent';
import ProfileScreen from './profileScreen/profileScreen';
import {isLoggedIn} from '../../shared/services/authServices';
import StaticScreens from './staticScreen/staticScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP as vh,
  normalize,
} from '../../responsive/responsive';
const screenWidth = Dimensions.get('window').width;

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
        drawerActiveTintColor: style.drawerActiveTintColor,
        drawerInactiveTintColor: style.drawerInactiveTintColor,
        drawerActiveBackgroundColor: style.drawerActiveBackgroundColor,
      }}
      backBehavior="history"
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

let style = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: normalize(16),
  },
  headerStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    // height: screenWidth < 480 ? 56 : 70,
  },
  finededLogo: {
    marginRight: 20,
    height: vh(5),
    width: vh(5),
  },
  drawerActiveTintColor: '#f06d06',
  drawerInactiveTintColor: '#212529',
  drawerActiveBackgroundColor: '#fff',
  headerTintColor: '#212529',
});
