import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTravelTimeInformation, setSelectedVehicle } from '../slices/navigationSlice';
import { getVehicles } from '../utils/api_utility';
import { Icon } from '@rneui/base';

const RideOptionsCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const fetchedVehicles = await getVehicles();
        setVehicles(fetchedVehicles);
        setIsLoading(false);
      } catch (error) {
        // TODO: Add a default vehicles list later
        console.error('Error fetching vehicles:', error);
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleSelection = () => {
    dispatch(setSelectedVehicle(selected));
    navigation.navigate('BroadCastIndicator');
  };

  return isLoading ? (
    <SafeAreaView style={tailwind`flex-grow justify-center items-center`}>
      <Text>Loading...</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={tailwind`bg-white flex-grow`}>
      <View style={tailwind`flex-row items-center justify-between -mt-4`}>
        <TouchableOpacity
          onPress={() => navigation.pop(1)}
          style={tailwind`p-3 rounded-full ml-4 mr-4`}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
        <Text style={tailwind`text-xl font-semibold flex-shrink mr-8`}>
          Selecciona tu medio de Transporte
        </Text>
      </View>
      <FlatList
        data={vehicles}
        style={tailwind`px-2 flex-grow -mx-2`}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({ item: { id, name, emission_gco2_per_km, image_url } }) => (
          <TouchableOpacity
            onPress={() => setSelected({ id, name, emission_gco2_per_km, image_url })}
            style={[tailwind`rounded-3xl`, styles.routeCard]}>
            <Image
              style={styles.vehicleImage}
              source={{ uri: image_url }}
            />
            <Text style={[tailwind`text-lg font-semibold`, styles.textTitles]}>{name}</Text>
            {/* <Text style={tailwind`text-xs font-semibold`}>Distancia - Tiempo</Text>
            <Text style={tailwind`flex flex-row justify-center items-center`}>{travelTimeInformation?.distance.text} - {travelTimeInformation?.duration.text}</Text> */}
            <View style={tailwind`justify-center items-center`}>
              <Text style={styles.textSubTitles}>Emisiones {'\n'} totales</Text>
              <Text style={tailwind`text-xs pt-2 text-center font-semibold`} >{((travelTimeInformation?.distance.value / 1000) * emission_gco2_per_km).toFixed(1)} gCO2</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={tailwind`px-5`}>
        <TouchableOpacity
          disabled={!selected}
          onPress={handleSelection}
          style={[tailwind`h-12 rounded-3xl flex flex-row justify-center items-center px-6 mt-2 mb-4`, !selected ? tailwind`bg-gray-300` : styles.loginButton]}
        >
          <Text style={tailwind`text-center text-white text-xl font-bold uppercase`}>
            Seleccionar {selected?.name}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#39BF68',
    shadowColor: '#72E885',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  routeCard: {
    backgroundColor: '#E5F7ED',
    padding: 15,
    margin: 10,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#39BF68",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  textTitles: {
    color: '#39BF68',
    fontSize: 18,
    marginBottom: 15,
    marginTop: -15,
    textAlign: 'center'
  },
  textSubTitles: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center'
  },
  vehicleImage: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    marginBottom: 10,
  }
});

export default RideOptionsCard;
