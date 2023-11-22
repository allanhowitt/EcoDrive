import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import tailwind from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../slices/authSlice';
import { updateUserOnServer } from '../utils/api_utility';
import { selectUser } from '../slices/authSlice';

const EditProfileScreen = ({ navigation }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    try {
      // API call to update user details
      await updateUserOnServer(user.id, { name, email, password });

      // Updating user details in Redux store
      dispatch(updateUserDetails({ name, email }));

      // Navigate back to user profile screen
      navigation.navigate('UserProfileScreen');
    } catch (error) {
      console.error('Error updating user details:', error);
      Alert.alert('Update Failed', 'Could not update user details.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
        <View style={tailwind`justify-center items-center mb-8`}>
          <Image
            source={require('../images/update_profile.png')}
            style={tailwind`w-80 h-80`}
          />
        </View>
        <Text style={tailwind`text-4xl text-center font-bold mb-6`}>Editar Perfil</Text>
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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[tailwind`w-full rounded-3xl h-12 px-4 mb-4`, styles.input]}
          placeholderTextColor="#000"
          placeholder="Nueva Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={handleUpdate}
          style={[tailwind`h-12 rounded-3xl flex flex-row justify-center items-center px-6 mt-4`, styles.updateButton]}
        >
          <Text style={tailwind`text-base text-white font-medium`}>Actualizar Perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

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
  updateButton: {
    backgroundColor: '#39BF68',
    borderColor: '#39BF68',
  },
});

export default EditProfileScreen;
