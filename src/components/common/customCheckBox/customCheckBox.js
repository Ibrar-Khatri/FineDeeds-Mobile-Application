import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from './customCheckBoxStyle';

export default function CustomCheckBox(props) {
  let {isChecked, callOnPress} = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={isChecked ? style.focusCheckBox : style.blurCheckBox}
      onPress={callOnPress}>
      {isChecked && <FontAwesome name="check" size={15} color="#fff" />}
    </TouchableOpacity>
  );
}
