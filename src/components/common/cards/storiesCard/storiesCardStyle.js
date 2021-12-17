import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  normalize,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

export default StyleSheet.create({
  mainView: {
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    width: vh(45),
  },
  imageStyle: {
    height: vh(27),
    width: vh(42),
    alignSelf: 'center',
    borderRadius: 15,
  },
  cardBodyView: {
    width: '93%',
    marginTop: 18,
  },
  nameAndOrgName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  descriptionView: {
    marginTop: 30,
    marginBottom: 20,
  },
  storyTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  tagsStyles: {
    br: {display: 'none'},
    h1: {fontSize: normalize(10), margin: 0, padding: 0},
    h2: {fontSize: normalize(10), margin: 0, padding: 0},
    h3: {fontSize: normalize(10), margin: 0, padding: 0},
    body: {
      color: '#212529',
      height: 56,
      overflow: 'hidden',
      fontSize: normalize(10),
    },
  },
});
