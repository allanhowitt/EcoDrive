import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React from 'react'
import tailwind from 'twrnc';
import { Touchable } from 'react-native';
import { Icon } from '@rneui/base';

const data = [
  {
    id: "123",
    icon: "home",
    location: "Casa",
    destination: "San Antonio, Medellín "
  },
  {
    id: "456",
    icon: "book",
    location: "Unvesdad",
    destination: "ITM fraternidad, Medellín "
  },
  {
    id: "789",
    icon: "briefcase",
    location: "Trabajo",
    destination: "Grisú, Medellín "
  },
];

const NavigationFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[tailwind`bg-gray-300 h-1`, { height: 0.5 }]}
        />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity style={[tailwind`flex-row items-center p-5`, styles.container]}>
          <Icon
            style={tailwind`mr-4 rounded-full p-3`}
            name={icon}
            type='ionicon'
            color='#39BF68'
            size={18}
          />
          <View>
            <Text style={tailwind`font-semibold text-lg`}>{location} </Text>
            <Text style={tailwind`text-gray-500`}>{destination} </Text>
          </View>
        </TouchableOpacity>
      )}
      style={styles.container}
    />
  );
}

export default NavigationFavourites

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2"
  },
})