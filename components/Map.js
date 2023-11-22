import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tailwind from 'twrnc';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navigationSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination)
  const apiGoogleKey = GOOGLE_MAPS_API_KEY;
  const mapRef = useRef(null);
  const [isMapReady, setMapReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination || !isMapReady) return;

    // Calculate the bounds that include both origin and destination
    const bounds = {
      latitude: [origin.location.lat, destination.location.lat],
      longitude: [origin.location.lng, destination.location.lng],
    };

    // Calculate the center and span for the region
    const latitudeDelta = Math.max(...bounds.latitude) - Math.min(...bounds.latitude);
    const longitudeDelta = Math.max(...bounds.longitude) - Math.min(...bounds.longitude);
    const center = {
      latitude: (bounds.latitude[0] + bounds.latitude[1]) / 2,
      longitude: (bounds.longitude[0] + bounds.longitude[1]) / 2,
    };
    const region = {
      latitude: center.latitude,
      longitude: center.longitude,
      latitudeDelta: latitudeDelta + 0.005,
      longitudeDelta: longitudeDelta + 0.005,
    };

    // Set the region to adjust the map
    mapRef.current.animateToRegion(region, 1000);
  }, [origin, destination, isMapReady]);

  const onMapReady = () => {
    setMapReady(true);
  };

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}
            &units=imperial
            &key=${apiGoogleKey}`).then((res) => res.json()).then(data => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
      });
    };

    getTravelTime();

  }, [origin, destination, apiGoogleKey]);


  return (
    <MapView
      ref={mapRef}
      style={tailwind`flex-1`}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapReady={onMapReady}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={apiGoogleKey}
          strokeWidth={3}
          strokeColor='black'
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title='Origen'
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title='Destino'
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})