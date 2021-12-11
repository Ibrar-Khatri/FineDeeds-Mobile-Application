import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../../responsive/responsive';

export default StyleSheet.create({
  activitiesMainView: {
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    width: vh(45),
  },
  bgImageView: {
    height: vh(24),
    width: vh(40),
    alignSelf: 'center',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  dateCardImage: {
    height: vh(10),
    width: vh(7),
    marginLeft: 25,
    marginTop: -10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateStyle: {
    color: '#f06d06',
    fontFamily: 'Montserrat-Bold',
    fontSize: vh(2.2),
  },
  lineBetMonthAndDate: {
    width: vw(10),
    borderBottomColor: '#d3d1d0',
    borderBottomWidth: 1,
    margin: 4,
  },
  startingOn: {
    backgroundColor: '#f1ae44',
    width: vw(45),
    padding: 5,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopRightRadius: 15,
  },
  startingOnText: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    textAlignVertical: 'center',
    fontSize: vw(3),
  },
  cardBody: {
    width: vh(39),
  },
  activityTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    fontSize: vh(2.3),
    paddingTop: 15,
    paddingBottom: 15,
  },
  activityDec: {
    color: '#737373',
    fontFamily: 'Montserrat-Regular',
    fontSize: vh(1.8),
  },
  locationView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  locationText: {
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
    fontSize: vh(2),
  },

  causes: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
    fontSize: vh(2.1),
  },
  causesItem: {
    color: '#737373',
    fontFamily: 'Montserrat-Regular',
    fontSize: vh(1.8),
  },
});
