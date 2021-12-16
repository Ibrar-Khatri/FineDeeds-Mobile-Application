import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
  adjust,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  mainView: {
    backgroundColor: '#fff',
  },
  bodyView: {
    paddingLeft: 20,
    paddingRight: 20,
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
    fontFamily: 'Montserrat-ExtraBold',
  },
  subHeadingStyle: {
    color: '#fff',
    fontFamily: 'Montserrat-ExtraBold',
  },
  sideDetailCardView: {
    marginTop: 40,
  },
  joinAsNonProfitView: {
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
    marginBottom: 15,
  },
  joinAsNonProfitText: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
  },
  registerNowButtonView: {
    width: vw(40),
  },
  slickView: {
    marginTop: 50,
    height: vh(70),
  },
  slickDotStyle: {
    display: 'none',
  },
  activeDotStyle: {
    display: 'none',
  },
  dynamicDataView: {
    marginBottom: 20,
  },
});
