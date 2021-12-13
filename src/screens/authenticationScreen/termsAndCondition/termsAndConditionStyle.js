import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  mainView: {
    marginLeft: vw(8),
    marginRight: vw(8),
    marginTop: vh(5),
    marginBottom: vh(7),
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#212529',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  textWithoutIcon: {
    color: '#212529',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  textWithIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: vw(80),
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    color: '#212529',
    marginLeft: vw(3),
    textAlign: 'center',
    width: vw(70),
  },
  contentInCard: {
    backgroundColor: '#fffaf3',
    borderRadius: 20,
    paddingLeft: vw(5),
    paddingRight: vw(5),
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
