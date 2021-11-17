import React from 'react'
import { Text } from 'react-native'
import style from './invalidInputStyle'

export default function InvalidInput(props) {
    let { error } = props
    return <>
        <Text style={style.invalidInput}>{error}</Text>
    </>
}


