import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerTitleStyle: {
    fontFamily: 'Merriweather-Bold',
  },
  headerStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  finededLogo: {
    marginRight: 20,
  },
  drawerStyle: {
    // backgroundColor: 'red',
  },
  drawerLabelStyle: {
    color: '#212529',
  },
  // drawerActiveTintColor: {
  // },
  drawerActiveTintColor: 'black',
  drawerInactiveTintColor: 'blue',
  drawerActiveBackgroundColor: '#fff',
  drawerInActiveBackgroundColor: 'black',
});
