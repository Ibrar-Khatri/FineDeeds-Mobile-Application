import {StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';

export default StyleSheet.create({
  sideDetailCardView: {
    display: 'flex',
    alignItems: 'center',
    width: vw(85),
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  imageStyle: {
    height: vw(15),
    width: vw(15),
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 10,
    marginBottom: 10,
    color: '#212529',
    fontSize: vw(4),
  },
  detail: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    fontSize: vw(3.5),
  },
});
