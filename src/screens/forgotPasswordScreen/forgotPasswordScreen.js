import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import style from './forgotPasswordScreenStyle'
import InputFieldsHeader from '../../components/inputFieldsHeader/inputFieldsHeader'
import InputField from '../../components/inputField/inputField'
import CustomButton from '../../components/button/button'

export default function ForgotPasswordScreen() {
    let [email, setEmail] = useState('')
    return <View style={style.mianView}>
        <ScrollView>
            <InputFieldsHeader title='Forgot Password' subTitle='Please check your email for password reset code' />
            <View style={style.inputFieldsView}>
                <InputField type='email' value={email} setValue={setEmail} placeholder='Email Address' />
                <CustomButton buttonText="SEND CODE" />
            </View>
        </ScrollView>
    </View>
}