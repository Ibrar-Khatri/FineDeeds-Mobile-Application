import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import style from './signupScreenStyle'
import CustomButton from '../../components/button/button'
import InputField from '../../components/inputField/inputField'
import InputFieldsHeader from '../../components/inputFieldsHeader/inputFieldsHeader'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationLink from '../../components/navigationLink/navigationLink'

export default function SignupScreen({ navigation }) {

    let [acceptTermsAndCond, setAcceptTermsAndCond] = useState(false)

    const signupValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required('This field is required'),
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
            name: "",
            email: "",
            password: "",
        },
        validationSchema: signupValidationSchema,

        onSubmit: (values) => {
            const { email, password } = values;
            if (acceptTermsAndCond) {
                console.log(values)
            }
        },
    });

    let [showInvalidInput, setShowInvalidInput] = useState(false)

    return <View style={style.mianView}>
        <ScrollView>
            <InputFieldsHeader title='Volunteer Sign up' subTitle='Start helping someone today and engage with people who care as much as you do.' />
            <View style={style.inputFieldsView}>
                <InputField
                    type='text'
                    value={formik.values.name}
                    setValue={formik.handleChange("name")}
                    placeholder='Full Name'
                    invalidInput={showInvalidInput && formik.errors.name}
                />
                <InputField
                    type='email'
                    value={formik.values.email}
                    setValue={formik.handleChange("email")}
                    placeholder='Email Address'
                    autoCapitalize='none'
                    invalidInput={showInvalidInput && formik.errors.email}
                />
                <InputField
                    type='password'
                    value={formik.values.password}
                    setValue={formik.handleChange("password")}
                    secureTextEntry={true}
                    placeholder='Password'
                    invalidInput={showInvalidInput && formik.errors.password}
                />
                <View style={style.termsAndCondView}>
                    <View style={style.checkBoxAndTextView}>
                        <TouchableOpacity
                            style={acceptTermsAndCond ? style.focusCheckBox : style.blurCheckBox}
                            onPress={() => acceptTermsAndCond ? setAcceptTermsAndCond(false) : setAcceptTermsAndCond(true)}>
                            {
                                acceptTermsAndCond && <FontAwesome name='check' size={15} color='#fff' />
                            }
                        </TouchableOpacity>
                        <Text style={style.termsAndCond} >I Accept The Finedeeds
                            <Text style={style.termsAndCondLink} onPress={() => navigation.navigate('static-screen', { initialRouteName: 'terms-and-condition' })}>Term Of Service</Text>
                        </Text>
                    </View>
                    {
                        showInvalidInput && !acceptTermsAndCond && <Text style={style.invalidInput}>Accept Term Of Service is required</Text>
                    }
                </View>
                <CustomButton buttonText="SIGNUP" onClick={formik.handleSubmit} setShowInvalidInput={setShowInvalidInput} />
                <NavigationLink text='Already have an account?' link='Click Here' navigation={navigation.navigate} navigationLink='login' />
            </View>
        </ScrollView>
    </View>
}