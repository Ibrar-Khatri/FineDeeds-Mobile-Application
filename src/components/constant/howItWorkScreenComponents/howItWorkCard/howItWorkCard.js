import React from 'react';
import {Image, View} from 'react-native';
import ResponsiveText from '../../../common/responsiveText/responsiveText';
import style from './howItWorkCardStyle';

export default function HowItWorksCard(props) {
  let {index, title, about, image} = props;
  return (
    <View style={style.cardView}>
      <ResponsiveText style={style.title} size={16}>
        {index + 1 + '. ' + title}
      </ResponsiveText>
      <ResponsiveText style={style.about} size={12}>
        {about}
      </ResponsiveText>
      <View style={style.imageView}>
        <Image source={image} style={style.imageStyle} resizeMode="contain" />
      </View>
    </View>
  );
}
