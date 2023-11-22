import React from 'react';
import { Image, Dimensions, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain', // To make sure the image fits inside the container
    height: Dimensions.get('window').height * 0.4, // Set height to 40% of the screen height
  },
  title: {
    fontSize: 36,
    color: '#0D0D0D',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#0D0D0D',
    marginBottom: 10,
  }
});

const OnboardingData = [
  {
    backgroundColor: '#FFFFFF',
    image: <Image source={require('../images/the_world_is_mine.png')} style={styles.image} />,
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
    title: 'Bienvenido a EcoDrive',
    subtitle: 'Una iniciativa para reducir nuestra huella de carbono al promover medios de transporte más ecológicos.'
  },
  {
    backgroundColor: '#FFFFFF',
    image: <Image source={require('../images/select_in_map.png')} style={styles.image} />,
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
    title: 'Registro y Destino',
    subtitle: 'Después de registrarte, selecciona tu destino y medio de transporte.'
  },
  {
    backgroundColor: '#FFFFFF',
    image: <Image source={require('../images/bike_ride.png')} style={styles.image} />,
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
    title: 'Gana Puntos',
    subtitle: 'Durante tu viaje, acumula puntos por cada kilómetro recorrido.'
  },
  {
    backgroundColor: '#FFFFFF',
    image: <Image source={require('../images/claim_points.png')} style={styles.image} />,
    titleStyles: styles.title,
    subTitleStyles: styles.subtitle,
    title: 'Reclama Premios',
    subtitle: 'Usa tus puntos para reclamar premios y beneficios.¡Es tu recompensa por cuidar el planeta!'
  }
];

export default OnboardingData;
