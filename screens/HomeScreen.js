import { StyleSheet, View, SafeAreaView, Image, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import tailwind from 'twrnc';
import NavigationOptions from '../components/NavigationOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navigationSlice';
import { selectUser, loginSuccess, updateUserDetails } from '../slices/authSlice';
import LatestRoutes from '../components/LatestRoutes';
import { getUserDetails } from '../utils/api_utility';
import SavedRoutes from '../components/SavedRoutes';
export const Logo = require('../images/Logo.png');
import { GOOGLE_MAPS_API_KEY } from "@env";

const HomeScreen = () => {
  const apiGoogleKey = GOOGLE_MAPS_API_KEY;
  const dispatch = useDispatch();
  const appLanguage = 'es';
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserDetails();
        dispatch(updateUserDetails(userData));
        setLoading(false);  // Set loading to false after successfully fetching data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setLoading(false);  // Set loading to false even on error
      }
    };

    fetchUserData();
    dispatch(setDestination(null));
  }, [dispatch]);

  return (
    <SafeAreaView style={[tailwind`bg-white h-full`, styles.container]}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            <View style={tailwind`p-5`}>
              <Image
                source={Logo}
                style={{
                  width: 150,
                  height: 100,
                  resizeMode: 'contain',
                }} />
              {
                user ? (
                  <Text style={tailwind`text-2xl font-semibold mb-3 -mt-3`}>
                    Bienvenido de nuevo
                    {loading ? (
                      <ActivityIndicator style={tailwind`ml-1`} size="small" color="#39BF68" />
                    ) : (
                      <Text style={tailwind`font-bold text-green-500`}>{" " + user.name.split(' ')[0]}</Text>
                    )}
                  </Text>
                ) : null
              }

              <GooglePlacesAutocomplete
                placeholder='¿Desde dónde partimos?'
                styles={toInputBoxStyles}

                onPress={(data, details = null) => {
                  dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description
                  }))

                  dispatch(setDestination(null));
                }}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                  key: apiGoogleKey,
                  language: appLanguage,
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={200}
              />
              <NavigationOptions />
            </View>
          </>
        }
        data={[]}
        renderItem={null}  // no actual data to render in this FlatList, it just aids scrolling
        ListFooterComponent={
          <View style={tailwind`p-5 -mt-8`}>
            <LatestRoutes />
            <SavedRoutes />
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2'
  }
})

const toInputBoxStyles = StyleSheet.create({
  header: {
    backgroundColor: "#F2F2F2"
  },
  container: {
    backgroundColor: "#F2F2F2",
    flex: 0,
  },
  textInput: {
    fontSize: 18,
    backgroundColor: '#F2F2F2',
    borderColor: '#39BF68',
    borderWidth: 2,
    borderRadius: 15
  }
});