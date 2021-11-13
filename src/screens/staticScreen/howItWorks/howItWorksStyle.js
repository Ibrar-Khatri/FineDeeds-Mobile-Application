import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  howItWorksMainView: {
    backgroundColor: '#fff',
  },
  textView: {
    height: vh(8),
    display: 'flex',
    justifyContent: 'center',
    width: vw(90),
    alignSelf: 'center',
  },
  textStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#2b2b2b',
    fontSize: vw(5),
  },
  focusTextView: {
    borderBottomColor: '#f06d06',
    borderBottomWidth: 1,
  },
  focusTextStyle: {color: '#f06d06'},
});
