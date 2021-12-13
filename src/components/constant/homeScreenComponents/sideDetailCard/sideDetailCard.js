import React from 'react';
import {View, Text, Image} from 'react-native';
import ResponsiveText from '../../../common/responsiveText/responsiveText';
import style from './sideDetailCardStyle';

export default function SideDetailCard(props) {
  let {imageSource, title, detail} = props;

  return (
    <View style={style.sideDetailCardView}>
      <Image source={imageSource} alt="offer image" style={style.imageStyle} />
      <ResponsiveText style={style.title} size={14}>
        {title}
      </ResponsiveText>
      <ResponsiveText style={style.detail} size={10}>
        {detail}
      </ResponsiveText>
    </View>
  );
}
