import {StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';

export default StyleSheet.create({
  mainViewVolunteeringExp: {
    height: 100,
    width: 200,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
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
    alignItems:'center'
  },
  checkBoxText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    fontSize: vw(3.3),
  },
});
