import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

export default StyleSheet.create({
  sliderCardView: {
    display: 'flex',
    alignSelf: 'center',
  },
  imageStyle: {
    height: vh(45),
    width: vh(45),
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
  },
  abc: {
    width: vw(70),
    alignSelf: 'center',
  },
  leftQuote: {
    alignSelf: 'flex-end',
  },
  quote: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(0,0,0,.5)',
    fontSize: vh(2),
    letterSpacing: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  name: {
    marginTop: 15,
    alignSelf: 'flex-end',
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(0,0,0,.5)',
    fontSize: vh(2.5),
    letterSpacing: 1,
  },
});
