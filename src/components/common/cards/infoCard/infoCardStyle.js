import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

export default StyleSheet.create({
  infoCardView: {
    display: 'flex',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,.125)',
    borderRadius: 10,
    borderWidth: 1,
    padding: vw(3),
  },
  infoTitle: {
    color: '#212529',
    fontFamily: 'Montserrat-Bold',
  },
  infoPara: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
});
