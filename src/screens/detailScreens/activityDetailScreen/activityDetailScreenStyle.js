import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  normalize,
  widthPercentageToDP as vw,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  activityDetailScreenView: {
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: vw(55),
    width: '100%',
    borderRadius: 10,
  },
  descriptionTitle: {
    color: '#f06d06',
    fontFamily: 'Montserrat-SemiBold',
    padding: 15,
    borderBottomColor: '#f06d06',
    borderBottomWidth: 2,
    display: 'flex',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginBottom: 15,
  },
  activityBodyView: {
    padding: 15,
    borderTopColor: '#ebebeb',
    borderTopWidth: 2,
    width: '100%',
  },
  descriptionStyle: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,.7)',
    marginBottom: 15,
  },
  locationView: {
    backgroundColor: '#ffefe2',
    padding: vw(3),
    borderRadius: 10,
    marginBottom: 15,
  },
  locationTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#f06d06',
  },
  address: {
    color: '#212529',
    textAlign: 'center',
  },
  addressAndIconView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inforCardView: {
    marginBottom: 20,
  },
  profileView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImageView: {
    borderColor: '#f06d06',
    borderWidth: 3,
    height: vw(16),
    width: vw(16),
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: vw(15),
    width: vw(15),
    borderRadius: 100,
    overflow: 'hidden',
  },
  volunteerNameView: {
    marginLeft: 15,
  },
  volunteerName: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#212529',
  },
  volunteerHost: {
    fontFamily: 'Montserrat-Regular',
    color: '#888',
  },
  participantView: {marginTop: 15, display: 'flex', alignItems: 'center'},
  participantTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    borderColor: '#ebebeb',
    borderBottomWidth: 2,
    padding: vw(3),
    width: '100%',
  },
  noParticipantText: {
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  causesTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
  },
  causesItemView: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
