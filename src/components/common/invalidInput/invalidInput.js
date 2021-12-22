import React from 'react';
import {StyleSheet} from 'react-native';
import ResponsiveText from '../responsiveText/responsiveText';

export default function InvalidInput(props) {
  const {error} = props;
  return (
    <ResponsiveText style={style.invalidInput} size={10}>
      {error}
    </ResponsiveText>
  );
}

let style = StyleSheet.create({
  invalidInput: {
    color: 'red',
    paddingTop: 5,
  },
});
