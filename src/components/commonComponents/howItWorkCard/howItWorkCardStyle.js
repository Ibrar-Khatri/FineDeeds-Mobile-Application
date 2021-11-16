import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  cardView: {
    marginTop: 40,
    width: vw(85),
    alignSelf: 'center',
    display: 'flex',
  },
  title: {
    fontSize: vw(5),
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  about: {
    fontFamily: 'Montserrat-Regular',
    fontSize: vw(3.5),
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  imageView: {
    width: vw(80),
    backgroundColor: '#e5e5e5',
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
  },
  imageStyle: {
    height: vw(40),
    alignSelf: 'center',
    borderRadius: 10,
  },
});
