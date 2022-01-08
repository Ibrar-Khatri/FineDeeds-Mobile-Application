import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {ResponsiveText} from '../../../../../../components/common/common';
import {
  heightPercentageToDP as vh,
  widthPercentageToDP as vw,
} from '../../../../../../responsive/responsive';

export default function SliderCard(props) {
  const {name, image, quote} = props;
  return (
    <View style={style.sliderCardView}>
      <Image source={image} style={style.imageStyle} resizeMode="contain" />
      <View style={style.sliderCardBody}>
        <Image
          source={require('../../../../../../assets/images/right-quote.png')}
          alt="right-quote"
          style={style.rightQuote}
        />
        <ResponsiveText style={style.quote} size={12}>
          {quote}
        </ResponsiveText>
        <Image
          source={require('../../../../../../assets/images/left-quote.png')}
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

let style = StyleSheet.create({
  sliderCardView: {
    display: 'flex',
    alignSelf: 'center',
  },
  imageStyle: {
    height: vh(45),
    width: vh(45),
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
  },
  sliderCardBody: {
    width: vw(70),
    alignSelf: 'center',
  },
  leftQuote: {
    alignSelf: 'flex-end',
  },
  quote: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(0,0,0,.5)',
    letterSpacing: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  name: {
    marginTop: 15,
    alignSelf: 'flex-end',
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(0,0,0,.5)',
    letterSpacing: 1,
  },
});
