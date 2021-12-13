import {StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../../responsive/responsive';

export default StyleSheet.create({
  volunteerExpDetView: {
    paddingLeft: 5,
    width: '85%',
  },
  volunteerExpView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    paddingBottom: 15,
    borderBottomColor: ' rgba(0,0,0,.1)',
    borderBottomWidth: 1,
  },
  jobTitle: {
    color: '#212529',
    fontWeight: '500',
    marginBottom: 5,
  },
  jobDes: {
    color: 'rgba(0,0,0,.5)',
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    width: vw(10),
    justifyContent: 'space-around',
  },
});
