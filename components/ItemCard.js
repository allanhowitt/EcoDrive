import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import tailwind from 'twrnc';

const ItemCard = ({ item, onButtonPress, buttonText, showButton = true, redemptionInfo }) => {
  return (
    <View style={tailwind`mb-8 p-4 border border-gray-200 rounded-lg`}>
      <Image source={{ uri: item.image_url }} style={tailwind`w-full h-40 rounded-t-lg`} resizeMode="cover" />
      <View style={tailwind`pt-4 pb-2`}>
        <Text style={tailwind`text-2xl font-semibold mb-2`} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
        {redemptionInfo && (
          <>
            <Text style={tailwind`text-base`}>Fecha de canjeo: {redemptionInfo.date_and_time}</Text>
            <Text style={tailwind`text-base`}>Puntos gastados: {redemptionInfo.points_spent}</Text>
          </>
        )}
        <Text style={tailwind`text-base`}>Puntos necesarios: {item.points_required}</Text>
        <Text style={tailwind`text-base`}>Categoría: {item.category}</Text>
        {!item.availability && <Text style={tailwind`text-base text-red-500`}>No disponible</Text>}
        {item.expiry_date && <Text style={tailwind`text-base`}>Caduca el: {item.expiry_date}</Text>}
      </View>
      {showButton &&
        <Pressable
          style={[tailwind`h-10 rounded-3xl flex flex-row justify-center items-center px-6 mt-2`, item.availability ? styles.redeemButton : styles.lockedButton]}
          onPress={onButtonPress}
          disabled={!item.availability}
        >
          <Text style={tailwind`text-base text-white font-medium`}>{buttonText}</Text>
        </Pressable>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  redeemButton: tailwind`bg-green-600 border-green-600`,
  lockedButton: tailwind`bg-gray-300 border-gray-300`,
});

export default ItemCard;
