import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'
import style from './inputFieldsHeaderStyle'


export default function InputFieldsHeader(props) {
    let { title, subTitle } = props
    return <View style={style.mianView}>
        <Image source={require('../../../assets/fineDeedLogo.png')}
            style={style.fineDeedsLogo}
            resizeMode='cover'
        />
        <Text style={style.title}>{title}</Text>
        <Text style={style.subTitle}>{subTitle}</Text>
    </View>
}