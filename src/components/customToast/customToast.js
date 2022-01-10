import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ResponsiveText} from '../index';
import {
  normalize,
  widthPercentageToDP as vw,
} from '../../responsive/responsive';

export default function CustomToast({type, description}) {
  let name;
  if (type === 'success') {
    name = 'checkcircle';
  } else if (type === 'info') {
    name = 'exclamationcircle';
  } else if (type === 'error') {
    name = 'closecircle';
  } else if (type === 'warning') {
    name = 'warning';
  }
  return (
    <View style={[style.toastView, style[type]]}>
      <AntDesign name={name} size={normalize(15)} color="#fff" />
      <ResponsiveText style={style.toastText} size={15}>
        {description}
      </ResponsiveText>
    </View>
  );
}

let style = StyleSheet.create({
  toastView: {
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: vw(2),
  },
  toastText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: '600',
  },
  success: {
    backgroundColor: '#07bc0c',
  },
  info: {
    backgroundColor: '#3498db',
  },
  error: {
    backgroundColor: '#e50019',
  },
  warning: {
    backgroundColor: '#f1c40f',
  },
});
