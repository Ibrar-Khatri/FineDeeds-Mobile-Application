import React from 'react';
import {Image, View, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from './customToastStyle';
import ResponsiveText from '../responsiveText/responsiveText';
import {normalize} from '../../../responsive/responsive';

function CustomToast({type, description}) {
  let name;
  if (type === 'success') {
    name = 'checkcircle';
  } else if (type === 'info') {
    name = 'exclamationcircle';
  } else if (type === 'error') {
    name = 'closecircle';
  }
  return (
    <View style={[style.toastView, style[type]]}>
      <AntDesign name={name} size={normalize(15)} style={style.iconStyle} />

      <ResponsiveText style={style.toastText} size={15}>
        {description}
      </ResponsiveText>
    </View>
  );
}
export default CustomToast;
