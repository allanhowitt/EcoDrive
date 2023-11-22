import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import tailwind from 'twrnc';
import { getRecommendations } from '../utils/api_utility';

export default function RecommendationsScreen() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recs = await getRecommendations();
        setRecommendations(recs);
      } catch (error) {
        console.error('Error:', error);
        setError(error.toString());
      } finally {
        setLoading(false); // Stop loading indicator after data fetch
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <View style={tailwind`flex-1 p-4 bg-slate-50`}>
      <Text style={[tailwind`text-3xl font-bold mt-8 mb-2`, { color: '#0D0D0D' }]}>Recomendaciones</Text>
      {loading ? (
        // Loading indicator
        <ActivityIndicator size="large" color="#39BF68" />
      ) : error ? (
        // Error message
        <Text style={tailwind`text-red-500 mb-4`}>Failed to load recommendations: {error}</Text>
      ) : recommendations.length === 0 ? (
        // Message when no recommendations are available
        <Text style={tailwind`text-lg`}>No hay recomendaciones disponibles</Text>
      ) : (
        // Display recommendations
        <ScrollView>
          {recommendations.map((recommendation, index) => (
            <View key={index} style={[tailwind`mb-8 p-2 rounded-lg`, { borderColor: '#D1D5DB' }]}>
              <Image
                source={{ uri: recommendation.image_url }}
                style={tailwind`w-full h-64 mb-4 rounded-lg`}
                resizeMode="cover"
              />
              <Text style={[tailwind`text-2xl font-semibold mb-2`, { color: '#39BF68' }]}>{recommendation.title}</Text>
              <Text style={tailwind`text-base`}>{recommendation.description}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
