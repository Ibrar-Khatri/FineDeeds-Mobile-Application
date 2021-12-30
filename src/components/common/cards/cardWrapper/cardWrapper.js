import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';

let screenWidth = Dimensions.get('window').width;

export default function CardWrapper({children, onPress}) {
  return (
    <TouchableOpacity
    activeOpacity={0.5}
      style={style.cardView}
      onPress={() => onPress && onPress()}>
      {children}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  cardView: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    width: vw(screenWidth > 480 ? 65 : 75),
    borderColor: '#eaeaea',
    borderWidth: 1,
  },
});
