import { View, TouchableOpacity } from 'react-native'
import tailwind from 'twrnc';
import React from 'react'
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import BroadCastIndicator from '../components/BroadCastIndicator';
import { setDestination } from '../slices/navigationSlice';
import { useDispatch } from 'react-redux';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={tailwind`flex flex-col h-full`}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setDestination(null));
          navigation.pop(1)
        }}
        style={tailwind`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
        <Icon name="arrow-back" />
      </TouchableOpacity>

      <View style={tailwind`h-1/2`}>
        <Map />
      </View>

      <View style={tailwind`flex-grow`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='BroadCastIndicator'
            component={BroadCastIndicator}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen