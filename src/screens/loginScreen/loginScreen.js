import React, { useState } from 'react'
import style from './loginScreenStyle'
import { View, Text, ScrollView } from 'react-native'
import InputFieldsHeader from '../../components/inputFieldsHeader/inputFieldsHeader'
import InputField from '../../components/inputField/inputField'
import CustomButton from '../../components/button/button'

export default function LoginScreen({ navigation }) {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    return <View style={style.mianView}>
        <ScrollView>
            <InputFieldsHeader title='Login' subTitle='Be the change' />
            <View style={style.inputFieldsView}>
                <InputField type='email' value={email} setValue={setEmail} placeholder='Email' />
                <InputField type='password' value={password} setValue={setPassword} secureTextEntry={true} placeholder='Password' />
                <Text style={style.forgotPwsdText} onPress={() => navigation.navigate('forgot-password')}>Forgot Password?</Text>
                <CustomButton buttonText="LOG IN"/>
                <View style={style.signupLinkView}>
                    <Text style={style.text1}>Don't have an account?</Text>
                    <Text style={style.text2} onPress={() => navigation.navigate('signup')}>Click Here</Text>
                </View>
            </View>
        </ScrollView>
    </View>
}