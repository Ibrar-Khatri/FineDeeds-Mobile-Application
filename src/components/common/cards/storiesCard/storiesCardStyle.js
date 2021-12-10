import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
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
    width: vw(85),
  },
  imageStyle: {
    height: vh(27),
    width: vw(78),
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
    fontSize: vw(3),
  },
  descriptionView: {
    marginTop: 30,
    marginBottom: 20,
  },
  storyTitle: {
    fontSize: vw(3.5),
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  tagsStyles: {
    br: {display: 'none'},
    h1: {fontSize: vw(3.5), margin: 0, padding: 0},
    h2: {fontSize: vw(3.5), margin: 0, padding: 0},
    h3: {fontSize: vw(3.5), margin: 0, padding: 0},
    body: {
      color: '#212529',
      height: 60,
      overflow: 'hidden',
      fontSize: vw(3.3),
    },
  },
});
