import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'native-base';
import style from './sliderCardStyle';

export default function SliderCard(props) {
  let {name, image, quote} = props;
  return (
    <View style={style.sliderCardView}>
      <Image
        source={image}
        alt={name}
        style={style.imageStyle}
        resizeMode="contain"
      />
      <Image
        source={require('../../../assets/images/right-quote.png')}
        alt="right-quote"
        style={style.rightQuote}
      />
      <Text style={style.quote}>{quote}</Text>
      <Image
        source={require('../../../assets/images/left-quote.png')}
        alt="left-quote"
        style={style.leftQuote}
      />
      <Text style={style.name}>{name}</Text>
    </View>
  );
}
