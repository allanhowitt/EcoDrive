import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList, ActivityIndicator, Text } from 'react-native';
import tailwind from 'twrnc';
import { getRedeemableItems, redeemItem, getUserDetails } from '../utils/api_utility';
import ItemCard from './ItemCard';
import { selectUser, updateUserDetails } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const RedeemableItems = ({ points }) => {
  const dispatch = useDispatch(); // Use Redux dispatch
  const user = useSelector(selectUser); // Get the user object from Redux store
  const [redeemableItems, setRedeemableItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRedeemableItems = async () => {
      try {
        const items = await getRedeemableItems();
        setRedeemableItems(items);
      } catch (error) {
        setError('Could not fetch redeemable items');
      } finally {
        setLoading(false);
      }
    };
    fetchRedeemableItems();
  }, []);

  const handleRedeem = async (itemId, itemTitle, requiredPoints) => {
    if (points < requiredPoints) {
      Alert.alert("No hay suficientes puntos", "No tienes suficientes puntos para canjear este artículo.");
      return;
    }

    const payload = {
      "user_id": user.id,  // Use user ID from Redux store
      "redeemed_item_id": itemId,
      "date_and_time": new Date().toISOString(),
      "points_spent": requiredPoints
    };

    try {
      const responseData = await redeemItem(payload);
      if (responseData.code === 200) {
        Alert.alert("Artículo Canjeado", "Has canjeado el artículo exitosamente.");
        // Fetch updated user data and update Redux store
        try {
          const updatedUser = await getUserDetails();
          dispatch(updateUserDetails(updatedUser)); // Update the user details in the Redux store
        } catch (error) {
          console.error('Error fetching updated user details:', error);
        }
      } else {
        throw new Error(responseData.message || "Error canjeando el artículo.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "No se pudo canjear el artículo. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <View style={tailwind`p-4`}>
      {loading ? (
        <ActivityIndicator size="large" color="#39BF68" />
      ) : error ? (
        <Text style={tailwind`text-lg text-red-500`}>{error}</Text>
      ) : redeemableItems.length === 0 ? (
        <Text style={tailwind`text-lg`}>No hay artículos para canjear disponibles</Text>
      ) : (
        <FlatList
          data={redeemableItems}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onButtonPress={() => handleRedeem(item.id, item.title, item.points_required)}
              buttonText="Reclamar"
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default RedeemableItems;
