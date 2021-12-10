import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import InvalidInput from '../invalidInput/invalidInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import style from './datePickerStyle';
import DropShadow from 'react-native-drop-shadow';
import {heightPercentageToDP as vh} from '../../../responsive/responsive';

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
      <DropShadow style={showDatePicker && style.focusInputStyle}>
        <View style={[style.inputStyle, isCurrent && style.disabledBGColor]}>
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
          <Icon name="date-range" size={vh(3)} style={style.iconStyle} />
        </View>
      </DropShadow>
      {invalidInput && !isCurrent && <InvalidInput error={invalidInput} />}
    </TouchableOpacity>
  );
}
