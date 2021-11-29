import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import InvalidInput from '../invalidInput/invalidInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import style from './datePickerStyle';

export default function DateAndTimePicker(props) {
  let [showDatePicker, setShowDatePicker] = useState(false);

  let {value, setValue, invalidInput, isCurrent, maximumDate} = props;

  function setDate(date) {
    setShowDatePicker(false);
    setValue(moment(date).format('YYYY-MM-DD'));
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={style.inputView}
      onPress={() => !isCurrent && setShowDatePicker(true)}>
      <View
        style={[
          showDatePicker ? style.focusInputStyle : style.blurInputStyle,
          isCurrent && style.disabledBGColor,
        ]}>
        {showDatePicker && (
          <DateTimePicker
            isVisible={true}
            date={value ? new Date(value) : new Date()}
            onConfirm={setDate}
            onCancel={() => setShowDatePicker(false)}
            maximumDate={maximumDate}
          />
        )}
        {value && !isCurrent ? (
          <Text style={style.textStyle}>{moment(value).format('L')}</Text>
        ) : (
          <Text style={style.textStyle}>mm/dd/yyy</Text>
        )}
        <Icon name="date-range" size={20} style={style.iconStyle} />
      </View>
      {invalidInput && !isCurrent && <InvalidInput error={invalidInput} />}
    </TouchableOpacity>
  );
}
