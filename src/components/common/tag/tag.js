import React from 'react';
import {View} from 'native-base';
import style from './tagStyle';
import ResponsiveText from '../responsiveText/responsiveText';

export default function Tag(props) {
  const {bgColor, text, borderColor} = props;
  return (
    <View
      style={[
        style.itemView,
        {backgroundColor: bgColor},
        borderColor && {...style.borderStyle, borderColor: borderColor},
      ]}>
      <ResponsiveText style={[style.itemText]} size={11}>
        {text}
      </ResponsiveText>
    </View>
  );
}
