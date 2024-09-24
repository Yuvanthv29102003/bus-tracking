import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { register } = useAuth();
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true); // Start loading
    try {
      if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        setLoading(false);
        return;
      }
      if (password.length < 6) { // Basic password validation
        alert('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      
      await register(email, password, fullName); // Include fullName in registration
      navigation.navigate('UserDetails'); // Navigate to the new UserDetails screen
    } catch (error) {
      console.error('Failed to register: ', error);
      alert('Sign up failed. Please try again.');
    }
    setLoading(false); // Stop loading
  };
  

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/bus_image.jpg')} 
        style={styles.image}
      />
      <Text style={styles.headerText}>Create New Account</Text>

      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color="#666" style={styles.icon} />
        <TextInput 
          placeholder="Enter Full Name" 
          style={styles.input} 
          value={fullName} 
          onChangeText={setFullName} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#666" style={styles.icon} />
        <TextInput 
          placeholder="Enter Email" 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
        <TextInput 
          placeholder="Enter Your Password" 
          style={styles.input} 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSignUp}
        disabled={loading} // Disable while loading
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or continue with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <AntDesign name="google" size={30} color="#EA4335" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="apple1" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Sign in</Text>
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
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#7B61FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#666',
    marginRight: 5,
  },
  footerLink: {
    color: '#7B61FF',
    fontWeight: 'bold',
  },
});

export default SignUp;
