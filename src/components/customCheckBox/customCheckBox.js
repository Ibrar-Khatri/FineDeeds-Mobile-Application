import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {heightPercentageToDP as vh, normalize} from '../../responsive/responsive';

export default function CustomCheckBox(props) {
  const {isChecked, callOnPress} = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={isChecked ? style.focusCheckBox : style.blurCheckBox}
      onPress={callOnPress}>
      {isChecked && <FontAwesome name="check" size={normalize(12)} color="#fff" />}
    </TouchableOpacity>
  );
}

let style= StyleSheet.create({
  blurCheckBox: {
    height: vh(3),
    width: vh(3),
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  focusCheckBox: {
    backgroundColor: '#fd7e14',
    height: vh(3),
    width: vh(3),
    borderRadius: 4,
    marginRight: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
