import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import InvalidInput from '../invalidInput/invalidInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import style from './datePickerStyle';

export default function DateAndTimePicker(props) {
  let [isfocus, setIsFoucs] = useState(false);

  let {value, setValue, invalidInput, disabled} = props;

  function setDate(date) {
    setIsFoucs(false);
    setValue(JSON.stringify(date));
  }

  useEffect(() => {
    disabled && setValue('');
  }, [disabled]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={style.inputView}
      onPress={() => !disabled && setIsFoucs(true)}>
      <View
        style={[
          isfocus ? style.focusInputStyle : style.blurInputStyle,
          disabled && style.disabledBGColor,
        ]}>
        {isfocus && (
          <DateTimePicker
            isVisible={isfocus}
            value={value ? value : new Date()}
            onConfirm={setDate}
            onCancel={() => setIsFoucs(false)}
          />
        )}
        {value && !disabled ? (
          <Text style={style.textStyle}>
            {moment(JSON.parse(value)).format('L')}
          </Text>
        ) : (
          <Text style={style.textStyle}>mm/dd/yyy</Text>
        )}
        <Icon name="date-range" size={20} style={style.iconStyle} />
      </View>
      {invalidInput && <InvalidInput error={invalidInput} />}
    </TouchableOpacity>
  );
}
