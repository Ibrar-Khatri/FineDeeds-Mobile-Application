import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  invalidInput: {
    color: 'red',
    paddingTop: 5,
    fontSize: vw(3.3),
  },
});
