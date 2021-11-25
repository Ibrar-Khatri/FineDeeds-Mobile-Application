import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

let inputStyle = {
  padding: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#ced4da',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default StyleSheet.create({
  inputView: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    height: 83,
    alignSelf: 'center',
  },
  disabledBGColor: {
    backgroundColor: '#e9ecef',
  },
  focusInputStyle: {
    ...inputStyle,
    shadowColor: '#fd7e14',
    shadowRadius: 10,
    elevation: 1,
  },
  blurInputStyle: {
    ...inputStyle,
    color: '#495057',
  },
  textStyle: {
    color: '#212529',
    fontSize: vw(4),
    paddingTop: 7,
    paddingBottom: 7,
  },
});
