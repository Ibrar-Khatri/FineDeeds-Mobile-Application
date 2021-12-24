import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from '../../../../responsive/responsive';
import {ResponsiveText} from '../../../common/common';

export default function SideDetailCard(props) {
  const {imageSource, title, detail} = props;

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

let style = StyleSheet.create({
  sideDetailCardView: {
    display: 'flex',
    alignItems: 'center',
    width: vw(85),
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  imageStyle: {
    height: vh(8),
    width: vh(8),
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 10,
    marginBottom: 10,
    color: '#212529',
  },
  detail: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: '#212529',
  },
});
