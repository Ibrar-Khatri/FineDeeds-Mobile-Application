import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  mianView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  inputFieldsView: {
    marginTop: 30,
    marginLeft: vw(7),
    marginRight: vw(7),
  },
  termsAndCondView: {
    height: 60,
    marginBottom: 10,
  },
  checkBoxAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsAndCond: {
    color: 'black',
    alignSelf: 'center',
    fontSize: vw(4),
    fontWeight: '300',
  },
  termsAndCondLink: {
    color: '#f06d06',
  },
  invalidInput: {
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
  },
});
