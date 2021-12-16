import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'native-base';
import style from './emptyDataComponentStyle';
import ResponsiveText from '../responsiveText/responsiveText';

export default function EmptyDataComponent(props) {
  let {title} = props;
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
