import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name: '', email: '', password: ''});

    const submit = async () => {
        const {name, email, password} = form;

        if(!name || !email || !password) return Alert.alert('error', 'Please enter valid email and password')

        setIsSubmitting(true);

        try {
            await createUser({email, password, name});

            router.replace('/');

        } catch (error: any) {
            Alert.alert('error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Enter your Full name"
                value={form.name}
                onChangeText={(text)=> setForm((prevState) => ({...prevState, name: text}))}
                label="Full name"
            />
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
                title="Sign up"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Already have an account?
                </Text>
                <Link href="/sign-in" className="base-bold text-primary">
                    Sign In
                </Link>
            </View>
        </View>
    )
}
export default SignUp
