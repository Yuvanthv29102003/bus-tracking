import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const UserDetails = () => {
  const [fullName, setFullName] = useState('');
  const [boardingPoint, setBoardingPoint] = useState('');
  const [primaryBus, setPrimaryBus] = useState('');
  const [secondaryBus, setSecondaryBus] = useState('');
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleLocationPermission = () => {
    alert('Location access granted');
    setLocationModalVisible(false); // Close modal after granting permission
    navigation.navigate('PhoneAuth'); 
  };

  const openLocationModal = () => {
    setLocationModalVisible(true);
  };

  const closeLocationModal = () => {
    setLocationModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Please Fill The Below Details</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Full Name" 
        value={fullName} 
        onChangeText={setFullName}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Boarding point" 
        value={boardingPoint} 
        onChangeText={setBoardingPoint}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Primary Bus no" 
        value={primaryBus} 
        onChangeText={setPrimaryBus}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Secondary Bus no" 
        value={secondaryBus} 
        onChangeText={setSecondaryBus}
      />

      {/* Trigger to Open Modal */}
      <TouchableOpacity style={styles.modalButton} onPress={openLocationModal}>
        <Text style={styles.modalButtonText}>Allow location &#x1F4CD;</Text>
      </TouchableOpacity>

      {/* Modal for Location Permission */}
      <Modal
        visible={isLocationModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLocationModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Allow your location</Text>
            <Text style={styles.modalDescription}>
              We need your permission to access your location
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleLocationPermission}>
              <Text style={styles.modalButtonText}>Allow location &#x1F4CD;</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeLocationModal}>
              <Text style={styles.modalCloseButtonText}>Do Not Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue &#x27A1;</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',     // Centers content horizontally
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '90%', // Adjusted width to prevent narrow input
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#F9F9F9',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background for the modal
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%', // Adjusted width to match the inputs
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#7d7d7d',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 10,
  },
  modalCloseButtonText: {
    color: '#FF6347',
    fontSize: 14,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#7B61FF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
    width: '90%', // Adjusted width for the button
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDetails;
