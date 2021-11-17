import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  blurCheckBox: {
    height: vh(3),
    width: vh(3),
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  focusCheckBox: {
    backgroundColor: '#fd7e14',
    height: vh(3),
    width: vh(3),
    borderRadius: 4,
    marginRight: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
