import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  productCardMainView: {
    width: vw(screenWidth < 480 ? 50 : 41),
    margin: 10,
  },
  productImage: {
    height: vw(screenWidth < 480 ? 50 : 40),
    borderRadius: 10,
    overflow: 'hidden',
  },
  productTitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',

    marginTop: 13,
    marginBottom: 10,
  },
  productPickupText1: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
  },
  productPickupText2: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  productPrice: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06f07',
    marginTop: 13,
  },
});
