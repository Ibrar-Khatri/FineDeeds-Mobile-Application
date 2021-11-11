import React from 'react';
import {View, Text, Image} from 'react-native';
import style from './sideDetailCardStyle';

export default function SideDetailCard(props) {
  let {imageSource, title, detail, index} = props;
  //   let image = require(imageSource);
  return (
    <View style={style.sideDetailCardView} key={index}>
      <Image source={imageSource} alt="offer image" style={style.imageStyle} />
      <Text style={style.title}>{title}</Text>
      <Text style={style.detail}>{detail}</Text>
    </View>
  );
}
