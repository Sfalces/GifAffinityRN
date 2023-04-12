import React from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './src/ui/_styles/appThemes';
import { Home } from './src/ui/screens/HomeScreen/Home';
import { QueryClient, QueryClientProvider } from 'react-query';

export const App = () => {


const queryClient = new QueryClient();

  return (
    <SafeAreaView style={styles.appBackgroundColor}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </SafeAreaView>
  );
};
