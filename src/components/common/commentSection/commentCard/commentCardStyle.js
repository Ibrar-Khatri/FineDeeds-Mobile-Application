import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

export default StyleSheet.create({
  CommentCardMainView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: vh(2),
  },
  commentSection: {
    display: 'flex',
    width: '80%',
    marginTop: vh(1),
    marginLeft: vh(2),
    borderRadius: 10,
    padding: 10,
  },
  imageStyle: {
    height: vh(8),
    width: vh(8),
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fd7e14',
  },
  volunteerNameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  volunName: {
    color: '#212529',
  },
  since: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
    marginLeft: 7,
  },
  comment: {
    marginTop: vh(1),
    // marginBottom: vh(1),
    color: '#212529',
    marginLeft: 7,
  },
  removeCommentView: {
    alignSelf: 'flex-start',
    marginLeft: 7,
  },
  removeComment: {
    fontFamily: 'Montserrat-Regular',
    color: '#777',
  },
});
