import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import { apiClient } from '../utils/api_utility';
import tailwind from 'twrnc';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await apiClient.post('/register', {
        name,
        email,
        password
      });

      if (response.data && response.data.code === 200) {
        Alert.alert(
          'Registro Exitoso',
          'Usuario registrado con éxito.',
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('LoginScreen')
            }
          ]
        );
      } else {
        Alert.alert('Registro Fallido', 'No se pudo completar el registro.');
      }
    } catch (error) {
      // Handle error by showing an alert to the user
      Alert.alert('Registro Fallido', 'No se pudo completar el registro.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <View style={tailwind`justify-center items-center mb-8`}>
          <Image
            source={require('../images/ask_me_anything.png')}
            style={tailwind`w-80 h-80`}
          />
        </View>
        <Text style={tailwind`text-4xl text-center font-bold mb-6`}>Registro</Text>

        <TextInput
          style={[tailwind`w-full rounded-3xl h-12 px-4 mb-4`, styles.input]}
          placeholderTextColor="#000"
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[tailwind`w-full rounded-3xl h-12 px-4 mb-4`, styles.input]}
          placeholderTextColor="#000"
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={[tailwind`w-full rounded-3xl h-12 px-4 mb-4`, styles.input]}
          placeholderTextColor="#000"
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          onPress={handleRegister}
          style={[tailwind`h-12 rounded-3xl flex flex-row justify-center items-center px-6 mt-4`, styles.loginButton]}
        >
          <Text style={tailwind`text-base text-white font-medium`}>Registrarse</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('LoginScreen')}
          style={[tailwind`h-12 border-2 border-white rounded-3xl flex flex-row justify-center items-center px-6 mt-4`, styles.registerButton]}
        >
          <Text style={tailwind`text-base font-medium`}>Ir a Inicio de Sesión</Text>
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
