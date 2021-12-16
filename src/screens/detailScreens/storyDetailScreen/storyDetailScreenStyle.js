import {StyleSheet} from 'react-native';
import {
  normalize,
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../responsive/responsive';

export default StyleSheet.create({
  storyDetailMainView: {
    padding: 10,
    backgroundColor: '#fff',
  },
  storyImage: {
    height: vw(55),
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  publishDateStyle: {
    backgroundColor: '#f06d06',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  storyView: {
    marginTop: vh(4),
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    marginBottom: vh(2),
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: vw(11),
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tagsStyles: {
    br: {display: 'none'},
    h1: {
      fontSize: normalize(18),
      margin: 0,
      padding: 0,
      fontWeight: '400',
    },
    h2: {
      fontSize: normalize(16),
      margin: 0,
      padding: 0,
    },
    h3: {
      fontSize: normalize(14),
      margin: 0,
      padding: 0,
    },
    body: {
      fontSize: normalize(13),
      color: '#212529',
      fontFamily: 'Montserrat-Bold',
    },
  },
  publishView: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    paddingBottom: vh(2),
  },
  publishedBy: {
    color: '#212529',
    fontFamily: 'Montserrat-Bold',
  },
  publisherDetailMainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  profilImageAndNameView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImageView: {
    height: vh(8),
    width: vh(8),
    borderRadius: 100,
  },
  textView: {
    marginLeft: 15,
  },
  volunName: {
    color: '#212529',
    fontFamily: 'Montserrat-SemiBold',
  },
  shareSection: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    paddingBottom: vh(2),
  },
  likeView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  storiesLength: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
  },
  orgName: {
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
  CommentSectionView: {
    padding: 5,
  },
});
