import React from 'react'
import { Text, View } from 'react-native'
import style from './navigationLinkStyle'


export default function NavigationLink(props) {
    let { text, link, navigation, navigationLink } = props
    return <View style={style.linkView}>
        <Text style={style.text1}>{text}</Text>
        <Text style={style.text2} onPress={() => navigationLink ? navigation(navigationLink) : navigation()}>{link}</Text>
    </View>
}