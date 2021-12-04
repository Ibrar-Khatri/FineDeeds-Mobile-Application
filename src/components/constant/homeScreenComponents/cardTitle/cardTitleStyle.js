import {StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';

export default StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: vw(5),
    color: '#212529',
  },
  linkAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: vw(3),
    color: '#f06d06',
    marginLeft: 7,
  },
});
