import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostagensScreen = () => {
const navigation = useNavigation();

  const backhome = () => {
    navigation.replace('Home')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonBack} onPress={backhome}>
          <Text style={styles.textbBack}> 
            Back
          </Text>
        </TouchableOpacity>
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
  buttonBack: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 25,
    marginHorizontal: 5,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  textbBack: {
    color: '#000000',
    fontSize: 17,
  },
});

export default PostagensScreen;
