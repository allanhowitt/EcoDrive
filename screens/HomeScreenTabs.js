import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import RedeemPointsScreen from './RedeemPointsScreen';
import UserProfileScreen from './UserProfileScreen';
import RecommendationsScreen from './RecommendationsScreen';

const Tab = createBottomTabNavigator();

function HomeScreenTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Consejos') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Puntos') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#39BF68',
        tabBarInactiveTintColor: '#0D0D0D',
        tabBarLabelStyle: {
          fontSize: 15,
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          paddingTop: -15,
          paddingBottom: -5,
        },

        tabBarStyle: { height: 65, backgroundColor: '#F2F2F2' },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Consejos" component={RecommendationsScreen} />
      <Tab.Screen name="Puntos" component={RedeemPointsScreen} />
      <Tab.Screen name="Perfil" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreenTabs;