import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  inputView: {
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
    alignSelf: 'center',
  },
  inputStyle: {
    padding: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
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
  input: {
    color: 'black',
    fontSize: vw(4),
    padding: 5,
  },
  inputWidthWithIcon: {
    width: '90%',
  },
  inputWidthWithoutIcon: {
    width: '100%',
  },
  iconStyle: {
    alignSelf: 'center',
    color: '#6c757d',
    marginRight: 5,
  },
});
