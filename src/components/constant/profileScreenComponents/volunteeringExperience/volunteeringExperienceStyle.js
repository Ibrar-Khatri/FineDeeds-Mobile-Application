import {StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';

export default StyleSheet.create({
  mainViewVolunteeringExp: {
    minHeight: 100,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
  },
  modalMainView: {margin: 15},
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    fontSize: vw(3.5),
  },
  checkBoxAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  checkBoxText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    fontSize: vw(3.3),
  },
  descriptionLengthStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    fontSize: vw(3),
    textAlign: 'right',
    margin: 1,
  },
  buttonView: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
