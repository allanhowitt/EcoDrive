import { StyleSheet, Text, View, SafeAreaView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import tailwind from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navigationSlice';
import { selectDestination } from '../slices/navigationSlice';
import { useNavigation } from '@react-navigation/native';
import { GOOGLE_MAPS_API_KEY } from "@env";

const NavigateCard = () => {
  const apiGoogleKey = GOOGLE_MAPS_API_KEY;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tailwind`flex-1`}>
      <Text style={[tailwind`text-center py-5 text-xl font-semibold text-green-500`, toInputBoxStyles.header]}>Selecciona Tu Destino</Text>
      <View style={tailwind`border-t border-gray-300 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder='¿A dónde vamos?'
            styles={toInputBoxStyles}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(setDestination({
                location: details.geometry.location,
                description: data.description
              }));

              navigation.navigate('RideOptionsCard')
            }}
            query={{
              key: apiGoogleKey,
              language: 'es',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  header: {
    backgroundColor: "#F2F2F2"
  },
  container: {
    backgroundColor: "#F2F2F2",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    fontSize: 18,
    backgroundColor: '#F2F2F2',
    borderColor: '#39BF68',
    borderWidth: 2,
    borderRadius: 15
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  }
});