import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  mainView: {
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: vh(35),
  },
  headingAndSubHeadingView: {
    marginTop: vh(12),
    marginLeft: 20,
  },
  headingStyle: {
    color: '#fff',
    fontSize: vw(8),
    fontFamily: 'Montserrat-ExtraBold',
  },
  subHeadingStyle: {
    color: '#fff',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: vw(6),
  },
  sideDetailCardView: {
    marginTop: 40,
  },
  whatDoWeOffer: {
    marginTop: 40,
  },
  whatDoWeOffertEXT: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    fontSize: vw(5),
    marginLeft: 20,
    marginBottom: 40,
  },
  joinAsNonProfitView: {
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  joinAsNonProfittextView: {
    backgroundColor: '#212529c4',
    padding: 20,
  },
  joinAsNonProfitTitle: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: vh(4),
    marginBottom: 15,
  },
  joinAsNonProfitText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: vh(2),
    marginBottom: 20,
  },
  registerNowButtonView: {
    width: 200,
  },
  slickView: {
    height: vw(130),
    marginTop: 50,
    // backgroundColor: 'yellow',
  },
  slickDotStyle: {
    display: 'none',
  },
  activeDotStyle:{
      display:'none'
  }
});
