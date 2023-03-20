import React from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './src/appThemes.tsx/appThemes';
import { HomeScreen } from './src/screens/HomeScreen';

export const App = () => {
  return (
    <SafeAreaView style={styles.appBackgroundColor}>
      <HomeScreen />
    </SafeAreaView>
  );
};
