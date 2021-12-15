import {Input} from 'native-base';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  heightPercentageToDP as vh,
  normalize,
} from '../../../responsive/responsive';
import InvalidInput from '../invalidInput/invalidInput';
import style from './inputFieldStyle';

export default function InputField(props) {
  let [isfocus, setIsFoucs] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  let {
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
  } = props;

  return (
    <View style={style.inputView}>
      <DropShadow style={!loading && isfocus && style.focusInputStyle}>
        <View style={[style.inputStyle, loading && style.disabledBGColor]}>
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
