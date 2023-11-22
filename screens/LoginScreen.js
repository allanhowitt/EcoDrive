import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { apiClient } from '../utils/api_utility';
import { loginSuccess } from '../slices/authSlice';
import { storeToken } from '../utils/tokenStorage';
import tailwind from 'twrnc';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await apiClient.post('/login', { username, password }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      dispatch(loginSuccess({ user: username, token: response.data.access_token }));
      await storeToken(response.data.access_token);

      // Navigate to HomeScreen after successful login
      navigation.navigate('HomeScreenTabs');
    } catch (error) {
      // Handle error by showing an alert to the user
      Alert.alert('Login Fallido', 'Usuario o contraseña incorrectos.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <View style={tailwind`justify-center items-center mb-8`}>
          <Image
            source={require('../images/mobile_encryption.png')}
            style={tailwind`w-88 h-80`}
          />
        </View>
        <Text style={tailwind`text-4xl text-center font-bold mb-6`}>Inicio de Sesión</Text>

        <TextInput
          style={[tailwind`w-full rounded-3xl h-12 px-4 mb-4`, styles.input]}
          placeholderTextColor="#000"
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={[tailwind`w-full rounded-3xl h-12 px-4`, styles.input]}
          placeholderTextColor="#000"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* ! Una MousqueHerramienta que les servirá más adelante :D  */}
        {/* "Remember Me" and "Reset Password" functionalities, 
               uncomment and implement their functionalities. */}
        {/* <View style={tailwind`flex flex-row justify-between items-center my-8`}>
          <View style={tailwind`flex-row items-center`}>
            <Pressable style={tailwind`bg-white h-6 w-6 rounded-sm mr-2`}></Pressable>
            <Text style={tailwind`text-white`}>Remember me</Text>
          </View>
          <Pressable>
            <Text style={tailwind`text-white font-bold`}>Reset password</Text>
          </Pressable>
        </View> */}

        <Pressable
          onPress={handleLogin}
          style={[tailwind`h-12 rounded-3xl flex flex-row justify-center items-center px-6 mt-4`, styles.loginButton]}
        >
          <Text style={tailwind`text-base text-white font-medium`}>Iniciar Sesión</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('RegisterScreen')}
          style={[tailwind`h-12 border-2 border-white rounded-3xl flex flex-row justify-center items-center px-6 mt-4`, styles.registerButton]}
        >
          <Text style={tailwind`text-base font-medium`}>Registrarse</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  input: {
    backgroundColor: '#ECEDEF',
    color: '#0D0D0D',
  },
  loginButton: {
    backgroundColor: '#39BF68',
    borderColor: '#39BF68',
  },
  registerButton: {
    backgroundColor: '#F2F2F2',
    borderColor: '#39BF68',
  },
});
