import {StyleSheet} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';

export default StyleSheet.create({
  commentTitle: {
    fontFamily: 'Montserrat-Bold',
    color: '#212529',
    borderColor: '#ebebeb',
    borderBottomWidth: 1,
    padding: vw(3),
    marginBottom: vw(2),
    width: '100%',
  },
  allCommentsView: {
    marginTop: 20,
  },
  noCommentStyle: {
    color: '#6c757d',
    fontWeight: '700',
    textAlign: 'center',
  },
});
