import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  drawerActiveTintColor: 'red',
  drawerInactiveTintColor: 'blue',
  drawerLabelStyle: {
    fontFamily: 'Montserrat-SemiBold',
  },
  activeTintColor: '#f06d06',
  inactiveTintColor: '#212529',
  activeBackgroundColor: '#fff',
  pressColor: '#fff',
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
    height: 150,
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
  },
});
