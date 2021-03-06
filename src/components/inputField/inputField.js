import { Input } from 'native-base'
import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import style from './inputFieldStyle';



export default function InputField(props) {
    let [isfocus, setIsFoucs] = useState(false)
    let [showPassword, setShowPassword] = useState(false)

    let { value, setValue, type, secureTextEntry, placeholder, invalidInput, autoCapitalize } = props


    return <View style={style.inputView}>

        <View style={isfocus ? style.focusInputStyle : style.blurInputStyle}>
            <TextInput
                value={value}
                onChangeText={text => setValue(text)}
                style={style.input}
                keyboardType='default'
                placeholder={placeholder}
                placeholderTextColor='#7f858b'
                onFocus={() => setIsFoucs(true)}
                onBlur={() => setIsFoucs(false)}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry && !showPassword}
            />
            {
                type === 'password' &&
                (showPassword ?
                    <Icon name='eye-with-line' size={20} style={style.iconStyle} onPress={() => setShowPassword(false)} /> :
                    <Icon name='eye' size={20} style={style.iconStyle} onPress={() => setShowPassword(true)} />
                )
            }
        </View>
        {
            invalidInput && <Text style={style.invalidInput}>{invalidInput}</Text>
        }
    </View>
}