import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';
import tailwind from 'twrnc';

const dummyRoutes = [
  { id: '1', route: 'Hogar', icon: 'home' },
  { id: '2', route: 'Universidad', icon: 'graduation-cap' },
  { id: '3', route: 'Gimnasio', icon: 'dumbbell' },
  { id: '4', route: 'Oficina', icon: 'building' },
];

const SavedRoutes = () => {
  return (
    <View style={styles.container}>
      <Text style={tailwind`text-3xl font-bold mb-4`}>Rutas Guardadas <Text style={tailwind`text-xl font-light`}>(próximamente)</Text></Text>
      <FlatList
        data={dummyRoutes}
        horizontal
        style={tailwind`-mx-2`}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[tailwind`rounded-3xl`, styles.routeCard]}>
            <Icon
              name={item.icon}
              type='font-awesome-5'
              color='#39BF68'
              style={styles.icons}
              size={40}
            />
            <Text style={[tailwind`text-lg font-semibold`, styles.textTitles]}>{item.route}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  routeCard: {
    backgroundColor: '#E5F7ED',
    padding: 15,
    margin: 10,
    width: 140,
    height: 150,
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
    fontSize: 18
  },
  icons: {
    color: '#39BF68',
    paddingBottom: 10
  }
});

export default SavedRoutes;
