import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from './customCheckBoxStyle';

export default function CustomCheckBox(props) {
  let {isChecked, setIsChecked} = props;
  function handleChange() {
    setIsChecked && (isChecked ? setIsChecked(false) : setIsChecked(true));
  }
  return (
    <TouchableOpacity
      style={isChecked ? style.focusCheckBox : style.blurCheckBox}
      onPress={handleChange}>
      {isChecked && <FontAwesome name="check" size={15} color="#fff" />}
    </TouchableOpacity>
  );
}
