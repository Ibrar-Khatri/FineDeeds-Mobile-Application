import {StyleSheet} from 'react-native';
import {heightPercentageToDP as vh} from '../../../responsive/responsive';

export default StyleSheet.create({
  drawerActiveTintColor: 'red',
  drawerInactiveTintColor: 'blue',
  //   drawerActiveBackgroundColor: 'black',
  //   drawerInActiveBackgroundColor: 'pink',
  drawerLabelStyle: {
    color: '#212529',
  },
  nameText: {
    color: 'black',
    fontWeight: '500',
    fontSize: vh(2.5),
    margin: 5,
  },
  roleText: {
    color: '#212529',
    fontWeight: '300',
    fontSize: vh(2.5),
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
