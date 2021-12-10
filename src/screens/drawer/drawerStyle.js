import {Platform, StyleSheet} from 'react-native';

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
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  finededLogo: {
    marginRight: 20,
  },
  activeTintColor: '#f06d06',
  inactiveTintColor: '#212529',
  activeBackgroundColor: '#fff',
  pressColor: '#fff',
  headerTintColor: '#212529',
});
