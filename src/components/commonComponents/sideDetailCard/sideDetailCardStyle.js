import {StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default StyleSheet.create({
  sideDetailCardView: {
    display: 'flex',
    alignItems: 'center',
    width: vw(85),
    alignSelf: 'center',
    marginBottom: 30,
  },
  imageStyle: {},
  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 10,
    marginBottom: 10,
    color: '#212529',
  },
  detail: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
});
