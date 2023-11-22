import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import tailwind from 'twrnc';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RedeemableItems from '../components/RedeemableItems';
import RedeemedItems from '../components/RedeemedItems';
import { getUserDetails } from '../utils/api_utility';

const Tab = createMaterialTopTabNavigator();

const RedeemPointsScreen = () => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserDetails();
        // Update the points in the local state.
        setPoints(userData.points);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={tailwind`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#39BF68" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tailwind`flex-1`}>
      <View style={tailwind`p-4 mt-8 justify-center items-center -mb-4`}>
        <Text style={tailwind`text-3xl text-green-500 font-semibold `}><Text style={tailwind`text-3xl font-medium text-black`}>Tus Puntos actuales:</Text> {points}</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#39BF68', height: 5 },
          tabBarStyle: { backgroundColor: '#f2f2f2' },
        }}
      >
        <Tab.Screen name="Canjear Puntos">
          {() => <RedeemableItems points={points} />}
        </Tab.Screen>
        <Tab.Screen name="Items Canjeados" component={RedeemedItems} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default RedeemPointsScreen;
