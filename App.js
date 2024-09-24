import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import PhoneAuth from './screens/PhoneAuth';
import Home from './screens/Home'; 
import LoadingScreen from './screens/Loading'; 

const Stack = createNativeStackNavigator();

// Main app component
function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />; 
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={user ? 'Home' : 'Login'} 
        >
          {user ? (
            <Stack.Screen name="Home" component={Home} /> 
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>  
      <AppNavigator />
    </AuthProvider>
  );
}
