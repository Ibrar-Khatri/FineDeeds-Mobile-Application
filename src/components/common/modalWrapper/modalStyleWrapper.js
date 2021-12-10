import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  modalMainView: {
    height: vh(50),
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
  modalFooter: {
    borderTopColor: '#212529',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
