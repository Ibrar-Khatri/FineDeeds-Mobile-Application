import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import style from './signupScreenStyle'
import CustomButton from '../../components/button/button'
import InputField from '../../components/inputField/inputField'
import InputFieldsHeader from '../../components/inputFieldsHeader/inputFieldsHeader'


export default function SignupScreen() {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    return <View style={style.mianView}>
        <ScrollView>
            <InputFieldsHeader title='Volunteer Sign up' subTitle='Start helping someone today and engage with people who care as much as you do.' />
            <View style={style.inputFieldsView}>
                <InputField type='text' value={name} setValue={setName} placeholder='Full Name' />
                <InputField type='email' value={email} setValue={setEmail} placeholder='Email Address' />
                <InputField type='password' value={password} setValue={setPassword} secureTextEntry={true} placeholder='Password' />
                <Text style={style.termsAndCond} >I Accept The FinedeedsTerm Of Service</Text>
                <CustomButton buttonText="SIGNUP" />
            </View>
        </ScrollView>
    </View>
}