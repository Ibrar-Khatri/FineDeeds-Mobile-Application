import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import style from './loginScreenStyle'
import InputFieldsHeader from '../../components/inputFieldsHeader/inputFieldsHeader'
import InputField from '../../components/inputField/inputField'
import CustomButton from '../../components/button/button'
import NavigationLink from '../../components/navigationLink/navigationLink'

export default function LoginScreen({ navigation }) {

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Email must be valid')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password should be greater than ${min} characters`)
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,

        onSubmit: (values) => {
            const { email, password } = values;
            console.log(values)
        },
    });


    let [showInvalidInput, setShowInvalidInput] = useState(false)

    return <View style={style.mianView}>
        <ScrollView>
            <InputFieldsHeader title='Login' subTitle='Be the change' />
            <View style={style.inputFieldsView}>
                <InputField
                    type='email'
                    value={formik.values.email}
                    setValue={formik.handleChange("email")}
                    placeholder='Email'
                    invalidInput={showInvalidInput && formik.errors.email}
                    autoCapitalize='none'
                />
                <InputField
                    type='password'
                    value={formik.values.password}
                    setValue={formik.handleChange("password")}
                    secureTextEntry={true}
                    placeholder='Password'
                    invalidInput={showInvalidInput && formik.errors.password}
                />
                <NavigationLink link='Forgot Password?' navigation={navigation.navigate} navigationLink='forgot-password' />
                <CustomButton buttonText="LOG IN" onClick={formik.handleSubmit} setShowInvalidInput={setShowInvalidInput} />
                <NavigationLink text="Don't have an account?" link='Click Here' navigation={navigation.navigate} navigationLink='signup' />
            </View>
        </ScrollView>
    </View>
}