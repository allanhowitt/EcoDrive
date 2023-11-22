import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingData from './data/OnboardingData';
import Navigation from './screens/Navigation';

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    (async () => {
      const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
      if (onboardingCompleted) {
        setShowOnboarding(false);
      }
    })();
  }, []);

  const onDone = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}>

            {showOnboarding ? (
              <Onboarding
                onDone={onDone}
                onSkip={onDone}
                pages={OnboardingData}
                nextLabel="Siguiente"
                skipLabel="Saltar"
                nextButtonStyle={styles.nextButton}
                skipButtonStyle={styles.skipButton}
                bottomBarColor="#39BF68"
              />
            ) : (
              <Navigation />
            )}
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
      <StatusBar />
    </Provider>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    borderColor: "#39BF68",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#39BF68",
  },
  skipButton: {
    borderColor: "#39BF68",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  }
});
