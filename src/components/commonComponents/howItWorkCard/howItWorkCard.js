import React from 'react';
import {Image, Text, View} from 'react-native';
import style from './howItWorkCardStyle';

export default function HowItWorksCard(props) {
  let {index, title, about, image} = props;
  return (
    <View style={style.cardView}>
      <Text style={style.title}> {index + 1 + '. ' + title}</Text>
      <Text style={style.about}>{about}</Text>
      <View style={style.imageView}>
        <Image source={image} style={style.imageStyle} resizeMode="contain" />
      </View>
    </View>
  );
}
