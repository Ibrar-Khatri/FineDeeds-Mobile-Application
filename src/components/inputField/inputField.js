import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Entypo from 'react-native-vector-icons/Entypo';
import {normalize} from '../../responsive/responsive';
import {InvalidInput} from '../index';

export default function InputField(props) {
  let [isfocus, setIsFoucs] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  const {
    value,
    setValue,
    type,
    secureTextEntry,
    placeholder,
    invalidInput,
    autoCapitalize,
    keyboardType,
    multiline,
    maxLength,
    icon,
    onPress,
    loading,
    disabled,
  } = props;

  return (
    <View style={style.inputView}>
      <DropShadow style={!loading && isfocus && style.focusInputStyle}>
        <View
          style={[
            style.inputStyle,
            (loading || disabled) && style.disabledBGColor,
          ]}>
          <TextInput
            value={value}
            onChangeText={text => setValue(text)}
            style={[
              style.input,
              type === 'password' || icon
                ? style.inputWidthWithIcon
                : style.inputWidthWithoutIcon,
            ]}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#7f858b"
            onFocus={() => setIsFoucs(true)}
            onBlur={() => setIsFoucs(false)}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry && !showPassword}
            multiline={multiline}
            maxLength={maxLength}
            editable={!disabled}
          />
          {icon && (
            <TouchableOpacity onPress={onPress} style={style.iconStyle}>
              {icon}
            </TouchableOpacity>
          )}

          {type === 'password' &&
            (showPassword ? (
              <Entypo
                name="eye"
                size={normalize(13)}
                style={style.iconStyle}
                onPress={() => setShowPassword(false)}
              />
            ) : (
              <Entypo
                name="eye-with-line"
                size={normalize(13)}
                style={style.iconStyle}
                onPress={() => setShowPassword(true)}
              />
            ))}
        </View>
      </DropShadow>
      {invalidInput && <InvalidInput error={invalidInput} />}
    </View>
  );
}

let style = StyleSheet.create({
  inputView: {
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
    alignSelf: 'center',
  },
  inputStyle: {
    padding: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  disabledBGColor: {
    backgroundColor: '#e9ecef',
    opacity: 0.5,
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
  input: {
    color: 'black',
    fontSize: normalize(14),
    padding: 5,
  },
  inputWidthWithIcon: {
    width: '90%',
  },
  inputWidthWithoutIcon: {
    width: '100%',
  },
  iconStyle: {
    alignSelf: 'center',
    color: '#6c757d',
    marginRight: 5,
  },
});
