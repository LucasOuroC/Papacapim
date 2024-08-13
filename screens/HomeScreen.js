import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
  const backLogin = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonBack} onPress={backLogin}>
        <Text>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Welcome Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  buttonBack: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 5,
    width: 80,
    marginBottom: 10,
    alignItems: 'center',
  },
});
