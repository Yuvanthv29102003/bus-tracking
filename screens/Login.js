import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons for Google and Facebook
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for Apple
import { useAuth } from '../context/AuthContext'; // Import Auth Context
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Get login function from context

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigate to some protected route if needed
      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to login: ', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/bus_image.jpg')} style={styles.image} />
      <Text style={styles.headerText}>Signin your Account</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="21102310@rmd.ac.in"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.passwordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        <TouchableOpacity>
          <Text style={styles.resetText}>Reset now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>Or continue with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={30} color="#EA4335" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="facebook" size={30} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLinkText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    // width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    alignSelf: 'center', // Centers the image horizontally
    marginBottom: 30, // Space between the image and the header text
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: '#7A5AF8',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#333',
  },
  resetText: {
    color: '#7A5AF8',
    marginLeft: 5,
  },
  orText: {
    textAlign: 'center',
    color: '#333',
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  socialButton: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#f4f4f4',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#333',
  },
  signupLinkText: {
    color: '#7A5AF8',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default Login;
