import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  contentView: {
    backgroundColor: '#fff',
  },
  modalHeaderStyle: {
    color: '#212529',
    fontFamily: 'MontserratSemiBold',
    fontWeight: '700',
    fontSize: vw(4),
  },
  checkBoxAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  checkBoxText: {
    color: 'rgba(0,0,0,.6)',
    fontSize: vw(3.3),
  },
});
