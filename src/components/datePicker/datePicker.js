import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DropShadow from 'react-native-drop-shadow';
import {InvalidInput} from '../index';
import {normalize} from '../../responsive/responsive';

import ResponsiveText from '../responsiveText/responsiveText';

export default function DateAndTimePicker(props) {
  let [showDatePicker, setShowDatePicker] = useState(false);
  const {value, setValue, invalidInput, isCurrent, maximumDate} = props;
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
            <ResponsiveText style={style.textStyle} size={12}>
              {moment(value).format('L')}
            </ResponsiveText>
          ) : (
            <ResponsiveText style={style.textStyle} size={12}>
              mm/dd/yyy
            </ResponsiveText>
          )}
          <Icon
            name="date-range"
            size={normalize(15)}
            style={style.iconStyle}
          />
        </View>
      </DropShadow>
      {invalidInput && !isCurrent && <InvalidInput error={invalidInput} />}
    </TouchableOpacity>
  );
}

let style = StyleSheet.create({
  inputView: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
  },
  inputStyle: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  disabledBGColor: {
    backgroundColor: '#e9ecef',
  },
  focusInputStyle: {
    shadowColor: '#fd7e14',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  textStyle: {
    color: '#212529',
    paddingTop: 7,
    paddingBottom: 7,
  },
});
