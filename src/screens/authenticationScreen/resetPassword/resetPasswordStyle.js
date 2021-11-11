import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  mianView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  inputFieldsView: {
    marginTop: 30,
    marginLeft: vw(7),
    marginRight: vw(7),
  },
});
