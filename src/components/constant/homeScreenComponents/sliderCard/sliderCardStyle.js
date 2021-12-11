import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

export default StyleSheet.create({
  sliderCardView: {
    display: 'flex',
    width: vw(80),
    alignSelf:'center'
  },
  imageStyle: {
    height: vh(45),
    width: vh(45),
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
  },
  rightQuote: {
    marginLeft: 15,
  },
  leftQuote: {
    marginRight: 15,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  quote: {
    margin: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(0,0,0,.5)',
    fontSize: vh(2),
    letterSpacing: 1,
  },
  name: {
    marginRight: 15,
    alignSelf: 'flex-end',
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(0,0,0,.5)',
    fontSize: vh(2.5),
    letterSpacing: 1,
  },
});
