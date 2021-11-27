import {StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';

export default StyleSheet.create({
  mainViewVolunteeringExp: {
    minHeight: 100,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: 15,
    marginTop: 10,
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
  volunteerExpDetView: {
    paddingLeft: 5,
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
  buttonView: {
    alignSelf: 'flex-end',
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
    width: 40,
    justifyContent: 'space-around',
  },
});
