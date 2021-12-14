import React from 'react';
import {View} from 'react-native';
import ResponsiveText from '../../responsiveText/responsiveText';
import style from './infoCardStyle';

export default function InfoCard(props) {
  let {title, subTitle, styles} = props;
  return (
    <View style={[style.infoCardView, styles]}>
      <ResponsiveText size={13} style={style.infoTitle}>
        {title}
      </ResponsiveText>
      <ResponsiveText size={12} style={style.infoPara}>
        {subTitle}
      </ResponsiveText>
    </View>
  );
}
