import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ResponsiveText} from '../../index';
import {widthPercentageToDP as vw} from '../../../responsive/responsive';

export default function InfoCard(props) {
  const {title, subTitle, styles} = props;
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

let style = StyleSheet.create({
  infoCardView: {
    display: 'flex',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,.125)',
    borderRadius: 10,
    borderWidth: 1,
    padding: vw(3),
  },
  infoTitle: {
    color: '#212529',
    fontFamily: 'Montserrat-Bold',
  },
  infoPara: {
    color: '#212529',
    fontFamily: 'Montserrat-Regular',
  },
});
