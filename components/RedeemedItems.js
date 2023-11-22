import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList, ActivityIndicator, Text } from 'react-native';
import tailwind from 'twrnc';
import { getRedeemedItems, getRedeemableItems } from '../utils/api_utility';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';
import ItemCard from './ItemCard';

const RedeemedItems = () => {
  const [redeemedItems, setRedeemedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchRedeemedItems = async () => {
      try {
        const [redeemedItemsRes, redeemableItemsRes] = await Promise.all([
          getRedeemedItems(user.id),
          getRedeemableItems(),
        ]);

        const itemsMap = redeemableItemsRes.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});

        const itemsWithDetails = redeemedItemsRes.map(ri => ({
          ...itemsMap[ri.redeemed_item_id],
          redemptionInfo: {
            date_and_time: ri.date_and_time,
            points_spent: ri.points_spent,
          }
        }));

        setRedeemedItems(itemsWithDetails);
      } catch (error) {
        setError('Could not fetch redeemed items');
      } finally {
        setLoading(false);
      }
    };
    fetchRedeemedItems();
  }, []);

  return (
    <View style={tailwind`p-4`}>
      {loading ? (
        <ActivityIndicator size="large" color="#39BF68" />
      ) : error ? (
        <Text style={tailwind`text-lg text-red-500`}>{error}</Text>
      ) : redeemedItems.length === 0 ? (
        <Text style={tailwind`text-lg`}>No hay artículos canjeados</Text>
      ) : (
        <FlatList
          data={redeemedItems}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              showButton={false}
              redemptionInfo={item.redemptionInfo}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default RedeemedItems;
