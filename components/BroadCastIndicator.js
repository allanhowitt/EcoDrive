import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon } from '@rneui/base';
import useUserLocation from '../utils/useUserLocation';
import BroadCastIndicatorIcon from './BroadCastIndicatorIcon';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';
import { selectDestination, selectOrigin, selectTravelTimeInformation, selectSelectedVehicle } from '../slices/navigationSlice';
import axios from 'axios';
import tailwind from "twrnc";
import { BROKER_URL } from "@env";

const postLocationToBackend = async (messageData) => {
  try {
    await axios.post(`${BROKER_URL}/broker/publish_location/`, messageData);
  } catch (error) {
    console.error("Error sending location to backend:", error);
  }
}

const endRide = async (user) => {
  try {
    const endRideData = {
      userId: user.id,
      endRide: true
    };
    await axios.post(`${BROKER_URL}/broker/publish_location/`, endRideData);
  } catch (error) {
    console.error("Error ending the ride:", error);
  }
};

const BroadCastIndicator = () => {
  const [isActive, setIsActive] = useState(false);
  const user = useSelector(selectUser);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const vehicle = useSelector(selectSelectedVehicle);  // retrieve vehicle from store
  const location = useUserLocation(isActive);

  // Handle Location Publishing when location changes
  useEffect(() => {
    if (isActive) {
      // This will run every 5 seconds when isActive is true
      const intervalId = setInterval(() => {
        if (location) {
          const messageData = {
            userId: user.id,
            location: location,
            origin: origin,
            destination: destination,
            expectedTravelTime: travelTimeInformation,
            vehicle: vehicle,
          };
          console.log(messageData);
          postLocationToBackend(messageData);
        }
      }, 5000);

      // Clear interval on component unmount or if isActive becomes false
      return () => clearInterval(intervalId);
    }
  }, [isActive, location]);

  const handlePress = () => {
    if (isActive) {
      endRide(user);
    }
    setIsActive(!isActive);
  };

  return (
    <View style={styles.container}>
      {isActive ? (
        <>
          <BroadCastIndicatorIcon onPress={handlePress} />
          <Text style={tailwind`text-2xl font-semibold mb-3 mt-10`}>Finalizar Viaje</Text>
        </>
      ) : (
        <>
          <View style={[styles.dot, styles.center]}>
            <Icon
              name='broadcast-tower'
              type='font-awesome-5'
              color='#FFFFFF'
              size={32}
              onPress={handlePress}
            />
          </View>
          <Text style={tailwind`text-2xl font-semibold mb-3 mt-10`}>Empezar Viaje</Text>
        </>
      )}
    </View>
  );
}

export default BroadCastIndicator;

const _activeColor = '#39BF68'; // green
const _inactiveColor = '#FF0000'; // red
const _size = 100;

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _inactiveColor
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2'
  }
});
