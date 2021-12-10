import {Input} from 'native-base';
import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-vector-icons/Entypo';
import {heightPercentageToDP as vh} from '../../../responsive/responsive';
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
  } = props;

  return (
    <View style={style.inputView}>
      <DropShadow style={isfocus && style.focusInputStyle}>
        <View style={style.inputStyle}>
          <TextInput
            value={value}
            onChangeText={text => setValue(text)}
            style={[
              style.input,
              type === 'password'
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

          {type === 'password' &&
            (showPassword ? (
              <Icon
                name="eye"
                size={vh(2.8)}
                style={style.iconStyle}
                onPress={() => setShowPassword(false)}
              />
            ) : (
              <Icon
                name="eye-with-line"
                size={vh(2.8)}
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
