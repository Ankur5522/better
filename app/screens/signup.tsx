import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import Toast from "../components/topToast";

const Signup = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSubmitForm = (values: { name: string, email: string, password: string, confirmPassword: string }) => {
        if (!values.name || !values.email || !values.password || !values.confirmPassword) {
            setError('All fields are required');
            setToast({ message: 'All fields are required', type: 'error' });
            return;
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(values.email)) {
            setError('Invalid email');
            setToast({ message: 'Invalid email', type: 'error' });
            return;
        }

        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match');
            setToast({ message: 'Passwords do not match', type: 'error' });
            return;
        }

        // Reset error and show success toast
        setError(null);
        setToast({ message: 'Sign Up successful', type: 'success' });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            {toast?.message && <Toast key={toast?.message} type={toast.type} message={toast?.message} setMessage={setToast} />}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.heading}>Signup</Text>
                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    onSubmit={(values) => handleSubmitForm(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.formContainer}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                style={styles.input}
                                placeholder="Enter your name"
                            />
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                            />
                            <View>
                                <Text style={styles.label}>Password</Text>
                                    <View style={styles.passwordStrengthContainer}>
                                        { values.password?.length > 0 && (
                                            [...Array(5)].map((_, index) => {
                                                const passwordRegex = ['[a-z]', '[A-Z]', '[0-9]', '[!@#\$%\^&\*]', '.{8,}'];
                                                const passwordStrength = passwordRegex.map((regex) => new RegExp(regex)).filter((regex) => regex.test(values.password)).length;
                                                return (
                                                    <View key={index} style={[styles.passwordStrengthBox, passwordStrength > index ? styles.passwordStrengthBoxActive : null]}></View>
                                                )
                                            })
                                        )}
                                    </View>
                            </View>
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.input}
                                placeholder="Enter your password"
                                secureTextEntry
                            />
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                style={styles.input}
                                placeholder="Enter your password again"
                                secureTextEntry
                            />
                            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <Text style={styles.DontHaveAccount}>Already have an account? <Text onPress={() => router.back()}>Login</Text></Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    DontHaveAccount: {
        fontSize: 14,
        color: '#333',
        marginTop: 10,
    },
    passwordStrengthContainer: {
        flexDirection: 'row',
        width: '50%',
    },
    passwordStrengthBox: {
        flex: 1,
        height: 5,
        marginBottom: 15,
        backgroundColor: '#ddd',
        marginHorizontal: 2,
        borderRadius: 5,
    },
    passwordStrengthBoxActive: {
        backgroundColor: '#4CAF50',
    },
});
