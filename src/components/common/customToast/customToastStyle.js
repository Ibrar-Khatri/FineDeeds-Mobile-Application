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
  iconStyle: {
    color: '#D0D3D4',
  },
  toastText: {
    marginLeft: 10,
    color: '#D0D3D4',
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
});
