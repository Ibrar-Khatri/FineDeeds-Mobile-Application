import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

export default StyleSheet.create({
  productCardMainView: {
    width: vw(50),
    margin: 5,
  },
  productImage: {
    height: vw(50),
    borderRadius: 10,
    overflow: 'hidden',
  },
  productTitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
    fontSize: vw(4),
    marginTop: 13,
    marginBottom: 10,
  },
  productPickupText1: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
    fontSize: vw(3.7),
  },
  productPickupText2: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    fontSize: vw(3.7),
  },
  productPrice: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06f07',
    fontSize: vw(4),
    marginTop: 13,
  },
});
