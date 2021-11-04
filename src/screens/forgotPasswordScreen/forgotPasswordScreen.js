import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import style from './forgotPasswordScreenStyle'
import InputFieldsHeader from '../../components/inputFieldsHeader/inputFieldsHeader'
import InputField from '../../components/inputField/inputField'
import CustomButton from '../../components/button/button'
import NavigationLink from '../../components/navigationLink/navigationLink'

export default function ForgotPasswordScreen({ navigation }) {
    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Email must be valid')
            .required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: loginValidationSchema,

        onSubmit: (values) => {
            const { email } = values;
            console.log(values)
        },
    });


    let [showInvalidInput, setShowInvalidInput] = useState(false)
    return <View style={style.mianView}>
        <ScrollView>
            <InputFieldsHeader title='Forgot Password' subTitle='Please check your email for password reset code' />
            <View style={style.inputFieldsView}>
                <InputField
                    type='email'
                    value={formik.values.email}
                    setValue={formik.handleChange("email")}
                    placeholder='Email Address'
                    invalidInput={showInvalidInput && formik.errors.email}
                    autoCapitalize='none'
                />
                <CustomButton
                    buttonText="SEND CODE"
                    onClick={formik.handleSubmit}
                    setShowInvalidInput={setShowInvalidInput}
                />
                <NavigationLink text='Go Back' link='Login' navigation={navigation.navigate} navigationLink='login' />
            </View>
        </ScrollView>
    </View>
}