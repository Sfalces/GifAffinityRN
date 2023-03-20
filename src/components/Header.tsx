import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const Header = () => {
  return (
    <View
    style={styles.headerImg}
    >
      <Image
        source={require('../assets/GuifAffinityLogo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    headerImg: {
      alignItems: 'center',
      marginVertical: 20,
    },
});
