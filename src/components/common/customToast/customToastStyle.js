import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  toastView: {
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: vw(2),
  },
  toastText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: '600',
  },
  success: {
    backgroundColor: '#07bc0c',
  },
  info: {
    backgroundColor: '#3498db',
  },
  error: {
    backgroundColor: '#e50019',
  },
  warning: {
    backgroundColor: '#f1c40f',
  },
});
