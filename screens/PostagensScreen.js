import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostagensScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Postagens Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Fundo escuro para o tema
  },
});

export default PostagensScreen;
