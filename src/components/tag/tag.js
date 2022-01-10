import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ResponsiveText} from '../index';

export default function Tag(props) {
  const {bgColor, text, borderColor, color} = props;
  return (
    <View
      style={[
        style.itemView,
        {backgroundColor: bgColor},
        borderColor && {
          ...style.borderStyle,
          borderColor: borderColor,
        },
      ]}>
      <ResponsiveText
        style={[style.itemText, {color: color ? color : 'rgba(0,0,0,.6)'}]}
        size={11}>
        {text}
      </ResponsiveText>
    </View>
  );
}

let style = StyleSheet.create({
  itemView: {
    alignContent: 'center',
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    marginRight: 10,
    marginBottom: 8,
  },
  itemText: {
    fontFamily: 'Montserrat-SemiBold',
  },
  borderStyle: {
    borderWidth: 1,
  },
});
