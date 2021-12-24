import React from 'react';
import {StyleSheet} from 'react-native';
import Slick from 'react-native-slick';
import SliderCard from './sliderCard/sliderCard';
import {sliderContent} from '../../../../shared/helperData/homeScreen';
import {heightPercentageToDP as vh} from '../../../../responsive/responsive';

export default function WorkForThePeople() {
  return (
    <Slick
      style={style.slickView}
      showsButtons={false}
      dotStyle={style.slickDotStyle}
      activeDotStyle={style.activeDotStyle}
      autoplay={true}
      autoplayTimeout={5}>
      {sliderContent.map((item, i) => (
        <SliderCard
          key={i}
          image={item.image}
          name={item.name}
          quote={item.quote}
        />
      ))}
    </Slick>
  );
}

let style = StyleSheet.create({
  slickView: {
    marginTop: 50,
    height: vh(70),
  },
  slickDotStyle: {
    display: 'none',
  },
  activeDotStyle: {
    display: 'none',
  },
});
