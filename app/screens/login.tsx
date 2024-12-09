import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import Toast from "../components/topToast";

const Login = () => {
  const router = useRouter();

  const [rememberMe, setRememberMe] = React.useState(false);
  const [toast, setToast] = React.useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const handleFormSubmit = (values: { email: string, password: string }) => {
    if (!values.email || !values.password) {
      setToast({ message: 'All fields are required', type: 'error' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(values.email)) {
      setToast({ message: 'Invalid email', type: 'error' });
      return;
    }

    if(rememberMe) {
      localStorage.setItem('email', values.email);
    }

    setToast({ message: 'Login successful', type: 'success' });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
        {toast?.message && <Toast key={toast?.message} type={toast.type} message={toast?.message} setMessage={setToast} />}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Login</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
              />
              <View style={styles.rememberMeContainer}>
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
                  <Text style={styles.checkboxLabel}>Remember Me</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Text style={styles.DontHaveAccount}>Don't have an account? <Text onPress={() => router.push('/screens/signup')}>Sign Up</Text> </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
});
