import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import tailwind from 'twrnc';
import { getRides, getVehicleDetails } from '../utils/api_utility';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';

const LatestRoutes = () => {
  const [rides, setRides] = useState([]);
  const [vehicles, setVehicles] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchRidesAndVehicles = async () => {
      try {
        const userRidesResponse = await getRides(user.id);
        setRides(userRidesResponse || []);

        if (userRidesResponse) {
          const vehiclePromises = userRidesResponse.map(ride =>
            getVehicleDetails(ride.vehicle_used_id).then(vehicle =>
              ({ [vehicle.id]: vehicle.image_url })
            )
          );
          const vehicleDetailsArray = await Promise.all(vehiclePromises);
          setVehicles(Object.assign({}, ...vehicleDetailsArray));
        }
      } catch (error) {
        console.error("Failed to fetch rides or vehicles:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRidesAndVehicles();
  }, [user.id]);

  const renderRide = ({ item }) => (
    <View style={tailwind`mb-4 p-4 border border-gray-200 rounded-lg flex-row`}>
      <Image source={{ uri: vehicles[item.vehicle_used_id] }} style={tailwind`w-30 h-30 mr-4`} resizeMode="cover" />
      <View style={tailwind`flex-1`}>
        <Text style={tailwind`text-xl font-bold text-green-600 mb-2`} numberOfLines={1} ellipsizeMode='tail'>{item.route_name}</Text>
        <Text style={tailwind`text-base`}><Text style={tailwind`font-semibold`}>Distancia:</Text> {item.distance_traveled} km</Text>
        <Text style={tailwind`text-base`}><Text style={tailwind`font-semibold`}>Puntos:</Text> {item.points_obtained}</Text>
        <Text style={tailwind`text-base`}><Text style={tailwind`font-semibold`}>Carbono Ahorrado:</Text> {item.carbon_saved} kg</Text>
        <Text style={tailwind`text-base`}><Text style={tailwind`font-semibold`}>Duración (h/m/s):</Text> {item.ride_duration}</Text>
      </View>
    </View>
  );

  return (
    <View style={tailwind`mt-4`}>
      <Text style={tailwind`text-3xl font-bold mb-4`}>Tus Últimas Rutas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#39BF68" />
      ) : (
        rides.length === 0 ? (
          <Text style={tailwind`text-lg`}>No hay rutas disponibles</Text>
        ) : (
          <FlatList
            data={rides}
            renderItem={renderRide}
            keyExtractor={(item) => item.id.toString()}
          />
        )
      )}
    </View>
  );
};

export default LatestRoutes;
