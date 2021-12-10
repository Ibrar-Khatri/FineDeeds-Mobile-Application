import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  modalMainView: {
    backgroundColor: '#fff',
    width: vw(80),
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  modalHeaderView: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#212529',
    borderBottomWidth: 1,
  },
  titleStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '700',
    fontSize: vw(5),
  },
  buttonView: {
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonText: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    fontSize: vw(3.5),
  },
  bodyText: {
    color: '#212529',
    fontSize: vw(3.3),
    padding: 15,
  },
  modalFooter: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 20,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
