import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'native-base';
import ResponsiveText from '../responsiveText/responsiveText';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function EmptyDataComponent(props) {
  const {title} = props;
  return (
    <View style={style.imageAndTextView}>
      <Image
        source={require('../../../assets/images/empty-box.png')}
        alt="empty"
        size={60}
      />
      <ResponsiveText
        style={style.textStyle}
        size={12}>{`No ${title}`}</ResponsiveText>
    </View>
  );
}



let style= StyleSheet.create({
  imageAndTextView: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textStyle: {
    fontSize: vw(3.5),
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(0,0,0,.5)',
  },
});
