import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

export default StyleSheet.create({
  itemMainView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkBoxAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  checkBoxText: {
    color: 'rgba(0,0,0,.6)',
  },
});
