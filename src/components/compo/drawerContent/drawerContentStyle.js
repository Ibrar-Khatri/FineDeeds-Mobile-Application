import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  drawerActiveTintColor: 'red',
  drawerInactiveTintColor: 'blue',
  drawerLabelStyle: {
    color: '#212529',
  },
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
