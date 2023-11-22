import { SafeAreaView, View, Text, Pressable, Image } from 'react-native';
import tailwind from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';


const UserProfileScreen = ({ navigation }) => {
  const user = useSelector(selectUser); // Get the user data from the Redux store

  return (
    <SafeAreaView style={tailwind`flex-1 bg-slate-50`}>
      <View style={tailwind`flex-1 items-center justify-center gap-8`}>
        <Image
          source={{ uri: 'https://source.unsplash.com/random' }}
          style={tailwind`w-24 h-24 rounded-full`}
          resizeMode="cover"
        />
        <View style={tailwind`gap-2 items-center`}>
          <Text style={tailwind`text-slate-900 text-3xl font-bold`}>
            {user?.name || "Juan José "} {/* Use user data from the Redux store */}
          </Text>
          <Text style={tailwind`text-slate-900 text-lg`}>
            {user?.email || "juajo@ecodriv.com"} {/* Use user email from the Redux store */}
          </Text>
          <Text style={tailwind`text-slate-900 text-lg`}>
            Puntos: {user?.points} {/* Use user points from the Redux store */}
          </Text>
        </View>
      </View>
      <View style={tailwind`flex-1 justify-center gap-8`}>
        <Pressable
          style={tailwind`flex-row items-center gap-2 px-8`}
          onPress={() => navigation.navigate('EditProfileScreen')}
        >
          <Ionicons name="settings-outline" size={24} style={tailwind`text-slate-900`} />
          <Text style={tailwind`text-slate-900 text-lg`}>Editar Perfil</Text>
        </Pressable>
        <Pressable style={tailwind`flex-row items-center gap-2 px-8`}>
          <Ionicons name="help-buoy-outline" size={24} style={tailwind`text-slate-900`} />
          <Text style={tailwind`text-slate-900 text-lg`}>Ayuda </Text>
        </Pressable>
        <Pressable style={tailwind`flex-row items-center gap-2 px-8`}>
          <Ionicons name="ios-briefcase-outline" size={24} style={tailwind`text-slate-900`} />
          <Text style={tailwind`text-slate-900 text-lg`}>Políticas de privacidad </Text>
        </Pressable>
        <Pressable style={tailwind`flex-row items-center gap-2 px-8`}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <MaterialIcons name="logout" size={24} style={tailwind`text-slate-900`} />
          <Text style={tailwind`text-slate-900 text-lg`}>Cerrar sesión </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default UserProfileScreen