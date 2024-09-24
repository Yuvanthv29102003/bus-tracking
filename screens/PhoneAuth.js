import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOTPModalVisible, setIsOTPModalVisible] = useState(false);

  const navigation = useNavigation();

  // Create refs for each OTP input box
  const otpInputRefs = useRef([]);

  const handleGetOTP = () => {
    if (phoneNumber.length === 10) {
      setIsOTPSent(true);
      setIsOTPModalVisible(true); // Show OTP modal
      alert(`OTP sent to +91 ${phoneNumber}`);
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  const handleOTPChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input field
    if (value && index < 3) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length === 4) {
      setIsOTPModalVisible(false); // Hide OTP modal
      Alert.alert('Success', 'OTP Verified Successfully!');
      navigation.navigate('Home');
    } else {
      alert('Please enter the complete 4-digit OTP');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>Enter your mobile number to get OTP</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGetOTP}>
          <Text style={styles.buttonText}>GET OTP</Text>
        </TouchableOpacity>

        {/* OTP Modal */}
        <Modal
          visible={isOTPModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsOTPModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>OTP Verification</Text>
              <Text style={styles.modalDescription}>
                Enter the OTP sent to +91 {phoneNumber}
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpBox}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(value) => handleOTPChange(value, index)}
                    ref={(ref) => otpInputRefs.current[index] = ref} // Assign ref for each TextInput
                  />
                ))}
              </View>

              <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                <Text style={styles.buttonText}>VERIFY & PROCEED</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  innerContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    width: '100%',
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  input: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  button: {
    backgroundColor: '#7B61FF',
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpBox: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 10,
    width: '20%',
  },
});

export default PhoneAuth;
