import React from 'react';
import {Text, View, Image} from 'react-native';
import ResponsiveText from '../../../common/responsiveText/responsiveText';
import style from './sliderCardStyle';

export default function SliderCard(props) {
  let {name, image, quote} = props;
  return (
    <View style={style.sliderCardView}>
      <Image source={image} style={style.imageStyle} resizeMode="contain" />
      <View style={style.abc}>
        <Image
          source={require('../../../../assets/images/right-quote.png')}
          alt="right-quote"
          style={style.rightQuote}
        />
        <ResponsiveText style={style.quote} size={12}>
          {quote}
        </ResponsiveText>
        <Image
          source={require('../../../../assets/images/left-quote.png')}
          alt="left-quote"
          style={style.leftQuote}
        />
        <ResponsiveText style={style.name} size={15}>
          {name}
        </ResponsiveText>
      </View>
    </View>
  );
}
