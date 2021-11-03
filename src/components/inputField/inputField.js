import { Input } from 'native-base'
import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import style from './inputFieldStyle';



export default function InputField(props) {
    let [isfocus, setIsFoucs] = useState(false)

    let { value, setValue, type, secureTextEntry, placeholder } = props

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
                secureTextEntry={secureTextEntry}
            />
            {
                type === 'password' && <Icon name='eye' color='black' size={20} style={style.iconStyle} />
            }
        </View>
        {/* <Text style={style.invalidInput}>Invalid Email</Text> */}
    </View>
}