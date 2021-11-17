import React from 'react';
import {Image, View, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from './customToastStyle';

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
      <AntDesign name={name} size={20} style={style.iconStyle} />
      <Text style={style.toastText}>{description}</Text>
    </View>
  );
}
export default CustomToast;
