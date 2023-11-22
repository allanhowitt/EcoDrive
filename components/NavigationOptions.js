import { StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navigationSlice';
import { navigationData } from '../data/navigationOptionsData';

const NavigationOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const screenWidth = Dimensions.get('window').width;

  return (
    <FlatList
      data={navigationData}
      horizontal
      style={tailwind`-mx-2 mt-2`}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={[styles.routeCard, { width: screenWidth * 0.9, height: 200 }, tailwind`${!origin ? 'opacity-20' : ''}`]}
          disabled={!origin}
        >
          <ImageBackground
            source={item.image}
            style={styles.imageBackground}
            imageStyle={{ opacity: 0.4 }} // Reducing the image's opacity
          >
            <Text style={styles.text}>{item.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  routeCard: {
    backgroundColor: '#E5F7ED',
    margin: 10,
    borderRadius: 15,
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
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: "cover",
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0D0D0D',
    paddingHorizontal: 5,
  }
});

export default NavigationOptions;