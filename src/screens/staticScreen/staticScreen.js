import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, Image, View } from 'react-native'
import style from './staticScreenStyle'
import TermsAndCondition from './termsAndCondition/termsAndCondition'

const Stack = createNativeStackNavigator()

export default function StaticScreens({ route }) {
    let { initialRouteName } = route.params
    return <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
            name='terms-and-condition'
            component={TermsAndCondition}
            options={() => ({
                headerTitle: 'Terms and Conditions',
                headerTitleStyle: style.headerTitleStyle,
                headerStyle: style.headerStyle,
                headerRight: () => (
                    <Image source={require('../../assets/fineDeedLogo.png')} style={style.headerRightIcon} />
                ),
            })}

        />
    </Stack.Navigator>
}