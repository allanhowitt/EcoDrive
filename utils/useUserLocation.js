import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import * as Device from 'expo-device'

const useUserLocation = (isActive) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const updateLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      if (isActive) {
        unsubscribe = await Location.watchPositionAsync(
          {
            timeInterval: 5000,
            distanceInterval: 5,
            accuracy: Platform.OS === 'android' && !Device.isDevice ? Location.Accuracy.Lowest : Location.Accuracy.BestForNavigation,
          },
          (loc) => {
            setLocation(loc);
          }
        );
      } else if (unsubscribe) {
        unsubscribe.remove();
      }
    };

    updateLocation();

    return () => {
      if (unsubscribe) {
        unsubscribe.remove();
      }
    };
  }, [isActive]);

  return location;
};

export default useUserLocation;