import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

let contentText = {
  color: '#848383',
  fontSize: vw(3.5),
};

export default StyleSheet.create({
  aboutMainView: {
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: vw(60),
    alignSelf:'center',
    marginTop:30
  },
  titleText: {
    fontSize: vw(6),
    color: '#212529',
    textAlign: 'center',
    fontFamily: 'Merriweather-Black',
    height: vh(15),
    backgroundColor: '#fffaf4',
    textAlignVertical: 'center',
  },
  contentView: {
    margin: 30,
  },
  contentParaView: {
    marginTop: 25,
  },
  contentText: {
    ...contentText,
    fontFamily: 'Montserrat-Regular',
  },
  higlightedText: {
    ...contentText,
    fontFamily: 'Montserrat-Bold',
  },
});
