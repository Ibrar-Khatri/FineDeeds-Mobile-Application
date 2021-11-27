import {StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default StyleSheet.create({
  imageAndTextView: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textStyle: {
    fontSize: vw(3.5),
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(0,0,0,.5)',
  },
});
