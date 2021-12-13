import {Dimensions, Platform, StyleSheet} from 'react-native';
import {heightPercentageToDP as vh, normalize} from '../../responsive/responsive';
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
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
    height: screenWidth < 480 ? 56 : 70,
  },
  finededLogo: {
    marginRight: 20,
    height: vh(5),
    width: vh(5),
  },
  activeTintColor: '#f06d06',
  inactiveTintColor: '#212529',
  activeBackgroundColor: '#fff',
  pressColor: '#fff',
  headerTintColor: '#212529',
});
