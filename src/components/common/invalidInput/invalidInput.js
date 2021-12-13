import React from 'react';
import ResponsiveText from '../responsiveText/responsiveText';
import style from './invalidInputStyle';

export default function InvalidInput(props) {
  let {error} = props;
  return <ResponsiveText style={style.invalidInput} size={10}>{error}</ResponsiveText>;
}
