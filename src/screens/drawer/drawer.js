import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './homeScreen/homeScreeen';
import DrawerContent from '../../components/constant/drawerContent/drawerContent';
import ProfileScreen from './profileScreen/profileScreen';
import style from './drawerStyle';
import {isLoggedIn} from '../../shared/services/authServices';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation({navigation}) {
  let [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  let [user, setUser] = useState();

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
        drawerActiveTintColor: '#f06d06',
        drawerInactiveTintColor: '#212529',
        drawerActiveBackgroundColor: '#fff',
      }}
      backBehavior="initialRoute"
      initialRouteName="landing-screen"
      drawerContent={props => (
        <DrawerContent
          {...props}
          isUserAuthenticated={isUserAuthenticated}
          setIsUserAuthenticated={setIsUserAuthenticated}
          user={user}
        />
      )}>
      <Drawer.Screen
        name="landing-screen"
        component={HomeScreen}
        initialParams={{isUserAuthenticated: isUserAuthenticated}}
        options={{
          drawerLabel: 'Home',
          headerPressColor: 'red',
          headerPressOpacity: 0.5,
          pressColor: 'red',
        }}
      />
      {isUserAuthenticated && (
        <Drawer.Screen
          name="profile-screen"
          component={ProfileScreen}
          options={{drawerLabel: 'Profile'}}
        />
      )}
    </Drawer.Navigator>
  );
}
