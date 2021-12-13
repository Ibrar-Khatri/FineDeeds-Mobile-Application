import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  profileView: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  backgroungImage: {
    height: vw(45),
    width: vw(95),
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImageView: {
    height: vw(29),
    width: vw(29),
    height: vw(screenWidth < 480 ? 28 : 22),
    width: vw(screenWidth < 480 ? 28 : 22),
    marginTop: vh(-10),
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    height: vw(screenWidth < 480 ? 25 : 20),
    width: vw(screenWidth < 480 ? 25 : 20),
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: '#c3c3c3',
    borderWidth: 1,
  },
  userNameStyle: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  userLocationStyle: {
    color: '#212529',
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
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: vw(45),
    marginTop: 20,
  },
  aboutTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    marginBottom: 15,
  },
  aboutText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
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
    marginBottom: 15,
  },
  linkStyle: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06d06',
    marginBottom: 15,
  },
  activityView: {
    width: vw(screenWidth < 480 ? 70 : 60),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
    paddingLeft: vw(5),
    margin: 5,
  },
  activityImageStyle: {
    height: vw(screenWidth < 480 ? 20 : 14),
    width: vw(screenWidth < 480 ? 20 : 14),
  },
  activityTitleAndPostedByView: {marginLeft: 15},
  activityTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  activityPostedByText: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  timeLineHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 22,
  },
  timeLineHeaderTitle: {
    color: '#2b2b2b',
    fontFamily: 'Poppins-SemiBold',
  },
  focusedHeaderTimeTitle: {
    color: '#f06d06',
    borderBottomColor: '#f06d06',
    borderBottomWidth: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
