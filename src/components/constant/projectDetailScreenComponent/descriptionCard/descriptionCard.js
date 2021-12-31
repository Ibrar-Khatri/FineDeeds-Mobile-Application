import React from 'react';
import {StyleSheet} from 'react-native';
import {ResponsiveText} from '../../../common/common';
import {widthPercentageToDP as vw} from '../../../../responsive/responsive';

export default function DescriptionCard(props) {
  const {title, description} = props;
  return (
    <>
      {title && (
        <ResponsiveText size={15} style={style.detailTitle}>
          {title}
        </ResponsiveText>
      )}
      {description && (
        <ResponsiveText size={12} style={style.detail}>
          {description}
        </ResponsiveText>
      )}
    </>
  );
}

let style = StyleSheet.create({
  detailTitle: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,.7)',
    fontWeight: 'bold',
    marginBottom: vw(2),
  },
  detail: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,.7)',
    marginBottom: vw(3),
  },
});
