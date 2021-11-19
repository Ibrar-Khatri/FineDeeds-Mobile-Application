import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../responsive/responsive';

export default StyleSheet.create({
  titleAndIconView: {
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
  itemMainView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemView: {
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#f06f07',
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    marginRight: 10,
    marginBottom: 8,
  },
  itemText: {
    color: 'rgba(0,0,0,.6)',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: vw(3.5),
  },
  checkBoxAndTextView: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  checkBoxText: {
    color: 'rgba(0,0,0,.6)',
    fontSize: vw(3.4),
  },
});
