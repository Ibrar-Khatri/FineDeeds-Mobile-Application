import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  toastView: {
    height: vh(8),
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: vw(4),
    paddingRight: vw(4),
    marginLeft: vw(6),
    marginRight: vw(6),
  },
  iconStyle: {
    color: '#D0D3D4',
  },
  toastText: {
    fontSize: vh(2),
    marginLeft: 10,
    lineHeight: 15,
    color: '#D0D3D4',
    fontWeight: '600',
  },
  success: {
    backgroundColor: '#32AD69',
  },
  info: {
    backgroundColor: '#45869C',
  },
  error: {
    backgroundColor: '#dd4c57',
  },
});
