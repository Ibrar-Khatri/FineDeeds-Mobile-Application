import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  profileView: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  backgroungImage: {
    height: vw(45),
    width: vw(95),
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImageView: {
    height: 110,
    width: 110,
    marginTop: vh(-10),
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: '#c3c3c3',
    borderWidth: 1,
  },
  userNameStyle: {
    color: '#212529',
    fontSize: vw(5),
    fontFamily: 'Montserrat-SemiBold',
  },
  userLocationStyle: {
    color: '#212529',
    fontSize: vw(4),
    fontFamily: 'Montserrat-Regular',
  },
  userFollowersView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: vw(80),
    marginTop: 20,
  },
  userFollower: {
    alignItems: 'center',
  },
  userFollowerText: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: vw(3),
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: vw(50),
    marginTop: 20,
  },
  aboutTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    fontSize: vw(4),
    marginBottom: 15,
  },
  aboutText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    fontSize: vw(3.5),
    marginBottom: 15,
  },
  titleAndLinkView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    fontSize: vw(4),
    marginBottom: 15,
  },
  linkStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06d06',
    fontSize: vw(4),
    marginBottom: 15,
  },
  activityView: {
    height: vh(13),
    width: vw(80),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginLeft: vw(5),
    paddingLeft: vw(5),
  },
  activityImageStyle: {
    height: vw(20),
    width: vw(20),
  },
  activityTitleAndPostedByView: {marginLeft: 15},
  activityTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    fontSize: vw(3.5),
  },
  activityPostedByText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    fontSize: vw(3.5),
  },
  actionsheetItemCancelText: {
    justifyContent: 'center',
  },
});
