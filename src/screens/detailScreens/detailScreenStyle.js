import {Dimensions, Platform, StyleSheet} from 'react-native';
import {normalize} from '../../responsive/responsive';
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  headerTitleStyle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: normalize(16),
    color: '#212529',
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
    backgroundColor: '#fffaf4',
  },
});
