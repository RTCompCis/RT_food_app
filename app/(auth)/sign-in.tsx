import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {signIn} from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({email: '', password: ''});

    const submit = async () => {
        const {email, password} = form;
        if(!email || !password) return Alert.alert('error', 'Please enter valid email and password')

        setIsSubmitting(true);

        try {
            await signIn({email, password});

            router.replace('/');

        } catch (error: any) {
            Alert.alert('error', error.message);
            Sentry.captureEvent(error);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text)=> setForm((prevState) => ({...prevState, email: text}))}
                label="Email"
                keyboardType="email-address"
            />
            {/*
            <CustomButton/>
            */}
            <CustomInput
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text)=> setForm((prevState) => ({...prevState, password: text}))}
                label="password"
                secureTextEntry={true}
            />

            <CustomButton
            title="Sign in"
            isLoading={isSubmitting}
            onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Dont have an account?
                </Text>
                <Link href="/sign-up" className="base-bold text-primary">
                    Sign up
                </Link>
            </View>
        </View>
    )
}
export default SignIn
