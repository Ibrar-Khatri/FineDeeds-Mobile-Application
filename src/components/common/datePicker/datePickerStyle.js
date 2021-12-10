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
    alignSelf: 'center',
  },
  inputStyle: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  disabledBGColor: {
    backgroundColor: '#e9ecef',
  },
  focusInputStyle: {
    shadowColor: '#fd7e14',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  textStyle: {
    color: '#212529',
    fontSize: vw(4),
    paddingTop: 7,
    paddingBottom: 7,
  },
});
