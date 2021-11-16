import React from 'react';
import {View, Text, Image} from 'react-native';
import style from './sideDetailCardStyle';

export default function SideDetailCard(props) {
  let {imageSource, title, detail,} = props;

  return (
    <View style={style.sideDetailCardView}>
      <Image source={imageSource} alt="offer image" style={style.imageStyle} />
      <Text style={style.title}>{title}</Text>
      <Text style={style.detail}>{detail}</Text>
    </View>
  );
}
